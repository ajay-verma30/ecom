import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import './Home.css';
import axios from 'axios';

function Home() {
    const [showModal, setShowModal] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
    expired: false
  });
  useEffect(() => {
    const countDownDate = new Date("2025-07-19T15:37:25").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft(prev => ({ ...prev, expired: true }));
        return;
      }

      const days = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
      const hours = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
      const minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      const seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');

      setTimeLeft({ days, hours, minutes, seconds, expired: false });
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  const fetchCategory = async (category) => {
    try {
        setSearchParams({ category });
      const url =
        category === 'all'
          ? 'https://fakestoreapi.com/products'
          : `https://fakestoreapi.com/products/category/${category}`;
      const res = await axios.get(url);
      setProducts(res.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    const categoryFromURL = searchParams.get('category') || 'all';
    fetchCategory(categoryFromURL);
      if (window.analytics && typeof window.analytics.page === 'function') {
    window.analytics.page({
        path: window.location.pathname + window.location.search,
      url: window.location.href
    });
  }
  }, [searchParams]);

  const handleViewProduct = (product) => {
  setSelectedProduct(product);
  if (window.analytics && typeof window.analytics.track === 'function') {
    window.analytics.track("Product View", {
      productName: product.title,
      price: product.price,
      category: product.category,
      id: product.id
    });
  }
  setShowModal(true);
};

const handleAddtoCart = (e) =>{
e.preventDefault();
if(window.analytics && typeof window.analytics.track === "function"){
    window.analytics.track("Product View", {
      productName: selectedProduct.title,
      price: selectedProduct.price,
      category: selectedProduct.category,
      id: selectedProduct.id
    });
}
}
  return (
    <>
      <div className="sale-banner">
        <div className="banner">
          <Container className="text-center">
            <h2 className="headline">🎉 Big Sale Ends In!</h2>
            {timeLeft.expired ? (
              <p className="expired-text">⏰ Sorry, the sale has ended!</p>
            ) : (
              <Row className="timer-row justify-content-center">
                <TimerBox label="Days" value={timeLeft.days} />
                <TimerBox label="Hours" value={timeLeft.hours} />
                <TimerBox label="Minutes" value={timeLeft.minutes} />
                <TimerBox label="Seconds" value={timeLeft.seconds} />
              </Row>
            )}
          </Container>
        </div>
      </div>

      <div className="main-content mt-5">
        <Row>
          <Col md={2} className="bg-light p-3 rounded">
            <h5>Filter by Category</h5>
            <div className="d-grid gap-2 mt-3">
              <Button variant="outline-primary" onClick={() => fetchCategory('all')}>All</Button>
              <Button variant="outline-primary" onClick={() => fetchCategory("men's clothing")}>Men</Button>
              <Button variant="outline-primary" onClick={() => fetchCategory("women's clothing")}>Women</Button>
              <Button variant="outline-primary" onClick={() => fetchCategory("electronics")}>Electronics</Button>
              <Button variant="outline-primary" onClick={() => fetchCategory("jewelery")}>Jewelry</Button>
            </div>
          </Col>


          <Col md={10}>
            <h3 className="text-center mb-4">🛍️ Sale Products</h3>
            <Row>
              {products.length > 0 ? (
                products.map((product) => (
                  <Col key={product.id} md={3} className="mb-4">
                    <Card className="h-100">
                      <Card.Img
                        variant="top"
                        src={product.image}
                        alt={product.title}
                        style={{ height: '200px', objectFit: 'contain' }}
                      />
                      <Card.Body>
                        <h6 className="mt-2">{product.title.slice(0, 40)}...</h6>
                      </Card.Body>
                      <Card.Footer className="text-center">
                        <p><strong>${product.price}</strong></p>
                        <Button variant="info" onClick={() => handleViewProduct(product)}>View Product</Button>
                        <br/>
                        <br/>
                        <Button className='btn-success' type="submit">Add to Cart</Button>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))
              ) : (
                <p className="text-center">Loading products...</p>
              )}
            </Row>
          </Col>
        </Row>
      </div>


      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
  <Modal.Header closeButton>
    <Modal.Title>{selectedProduct?.title}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedProduct && (
      <Row>
        <Col md={5}>
          <img
            src={selectedProduct.image}
            alt={selectedProduct.title}
            style={{ width: '100%', objectFit: 'contain' }}
          />
        </Col>
        <Col md={7}>
          <p><strong>Category:</strong> {selectedProduct.category}</p>
          <p><strong>Description:</strong> {selectedProduct.description}</p>
          <p><strong>Price:</strong> ${selectedProduct.price}</p>
          <Button className="btn-success" onClick={handleAddtoCart}>Add to Cart</Button>
        </Col>
      </Row>
    )}
  </Modal.Body>
</Modal>

    </>
  );
}


function TimerBox({ label, value }) {
  return (
    <Col md={1} className="timer-box">
      <div className="timer-value"><b>{value}</b></div>
      <div className="timer-label">{label}</div>
    </Col>
  );
}

export default Home;
