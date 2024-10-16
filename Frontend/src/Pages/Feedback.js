import React, { useRef } from "react";

import axios from "axios";
import Header from "../components/Header";
import '../styles/Feedback.css';
import Footer from "../components/Footer";

const Feedback = () => {

    const suggestionsRef = useRef(null);
    const commentsRef = useRef(null);
    function handleSubmit(e) {
        e.preventDefault();

        const suggestions = suggestionsRef.current.value.trim();
        const comments = commentsRef.current.value.trim();
       


        const feedbackData = {
            suggestions: suggestions,
            comments: comments,
        };

        axios
            .post("http://localhost:8000/feedback/add", feedbackData, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(() => {
                alert("Feedback Added");
                console.log("Feedback added");
                
            })
            .catch((err) => {
                console.error("Error adding feedback:", err);
                alert("Error adding user. Check the console for details.");
            });
    }

    return (
        <div>
            <div>
            <Header />
            </div>
            <div className="new_home_web cus">
                <div className="responsive-container-block big-container">
                    <img className="imgBG" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/aw65.png" alt="Background" />
                    <div className="responsive-container-block textContainer ">
                        <div className="topHead">
                            <p className="text-blk heading">
                                Feed
                                <span className="orangeText"> back</span>
                            </p>
                            <div className="orangeLine" id="w-c-s-bgc_p-2-dm-id"></div>
                        </div>
                        <p className="text-blk subHeading">
    We value your opinion! Please share your thoughts and suggestions to help us improve your experience.
</p>

                    </div>
                    <div className="responsive-container-block container">
                        <div className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-7 wk-ipadp-10 line" id="i69b">
                            <form className="form-box" onSubmit={handleSubmit}>
                                <div className="container-block form-wrapper">
                                    <div className="responsive-container-block">
                                        <div className="left4">
                                        <textarea className="textinput " id="i5vyy-2" placeholder="Any Suggestions" required ref={suggestionsRef}></textarea>
                                            
                                        </div>
                                        <div className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12" id="i634i-2">
                                            <textarea className="textinput " id="i5vyy-2" placeholder="Comments" required ref={commentsRef}></textarea>
                                        </div>
                                    </div>
                                    <button className="send" type="submit" id="w-c-s-bgc_p-1-dm-id">
                                        Send
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Feedback;
