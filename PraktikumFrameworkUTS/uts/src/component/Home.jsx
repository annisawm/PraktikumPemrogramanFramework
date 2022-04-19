import React, { Component } from "react";

class Home extends Component {
    render() {
        return (
            <div class="card bg-dark text-black border-0">
                <img src="/assets/bg.jpg" class="card-img" alt="Background"
                    height="550px" />
                <div class="card-img-overlay d-flex flex-column justify-content-center">
                    <h5 class="card-title display-3 fw-bolder mb-0">Meet Our New Product</h5>
                    <p class="card-text">
                        CHECK OUT NOW!
                    </p>
                </div>
            </div>
        );
    }
}

export default Home;