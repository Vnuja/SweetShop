import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import CusHeader from '../Components/customer_header'; 
import Footer from '../Components/customer_footer';

function HomePageMain() {
    return (
        <div className="homepage-container">
            <div style={{ width: '100%' }}>
                <CusHeader />
            </div>
            
            {/* Hero Section */}
            <section className="hero-section" style={{ backgroundImage: `url(${"https://delhi6sweets.com.au/wp-content/uploads/2023/05/1662465216_groupindianassortedsweetsmithaiwithdiya.jpg"})` }}>
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1 style={{marginTop:'150px'}}>Best Sweets at your door step</h1>
                        <h2>Welcome to Candy Sweets</h2>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="services-section">
                <div className="services-container">
                    <h2 className="services-title">Our Services</h2>
                    <div className="services-grid">
                        {/* Row 1 */}
                        <div className="service-card">
                            <img src="https://www.sweets4me.co.uk/cdn/shop/collections/traditionalloose_0203cf46-429a-4e70-81ef-f2aa5bd6ec8a.jpg?v=1634897951&width=1080" alt="Custom Candy Orders" />
                            <h3>Custom Candy Orders</h3>
                            <p>Create personalized candy assortments for any occasion with your favorite sweets.</p>
                        </div>
                        <div className="service-card">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3WXPn6yJODgRmFiQ4Q_Xg7HCNNxjNjtDwtQ&s" alt="Party Packs" />
                            <h3>Party Packs</h3>
                            <p>Order colorful candy packs perfect for birthdays, weddings, and events.</p>
                        </div>
                        <div className="service-card">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0K3fkAApNS1z1Q8Ic4KIP1vDPaXYKnmlNWg&s" alt="Gift Wrapping" />
                            <h3>Gift Wrapping</h3>
                            <p>Beautiful gift wrapping services for candy boxes, perfect for gifting.</p>
                        </div>

                        {/* Row 2 */}
                        <div className="service-card">
                            <img src="https://roamingrosie.com/wp-content/uploads/2014/04/custom-chocolate-1.jpg?w=640" alt="Custom Chocolate Bars" />
                            <h3>Custom Chocolate Bars</h3>
                            <p>Create your own chocolate bar with unique toppings of your choice.</p>
                        </div>
                        <div className="service-card">
                            <img src="https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_44/1499740/halloween-candy-today-main-191028.jpg" alt="In-Store Candy Tastings" />
                            <h3>In-Store Candy Tastings</h3>
                            <p>Experience a variety of candy selections through guided tastings.</p>
                        </div>

                        {/* Row 3 */}
                        <div className="service-card">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA-8I0_yh036dzs5XLppAAnwOEa9rMgH8gyA&s" alt="Candy Buffet Setup" />
                            <h3>Candy Buffet Setup</h3>
                            <p>We set up beautiful candy buffets for events tailored to your theme.</p>
                        </div>
                        <div className="service-card">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsvFXmrAukpZ_VaTCRIygQzEB77SPQ58adeA&s" alt="Candy Workshops" />
                            <h3>Candy Workshops</h3>
                            <p>Learn to make your own candy treats in our fun workshops.</p>
                        </div>
                        <div className="service-card">
                            <img src="https://images.squarespace-cdn.com/content/v1/5acbef851aef1d6581b84e44/1524203521267-S09B0OU5RU5QPKVSQ4LM/Sweet+Bites+Gift+Box.jpg" alt="Corporate Gifts" />
                            <h3>Corporate Gifts</h3>
                            <p>Order custom candy gift sets for corporate events and holidays.</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer></Footer>
        </div>
    );
}

export default HomePageMain;
