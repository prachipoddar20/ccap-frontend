import React, { Fragment, useState } from "react";
import { httpClient } from "../http/http-client";

const Dashboard = (props) => {
  const [getAllCards, setgetAllCards] = useState([]);

  const getApproverQueue = () => {
    httpClient.get("cards").then((response) => {
      setgetAllCards(response.data);
    });
  };
  getApproverQueue();

  return (
    <>
      <h3>Apply for new credit card</h3>
      <hr />
      {/* Regular Cards */}
      <div className="row my-5">
        <legend>Regular Credit Cards</legend>
        {getAllCards.map((cards) => {
          return (
            <Fragment>
              {cards.category === "Regular" ? (
                <div className="col-6 col-md-4">
                  <div className="card-deck">
                    <div className="card" key={cards.id}>
                      <img
                        className="rounded  float-left w-5 p-2"
                        src={`http://localhost:5000/${cards.imageUrl}`}
                        alt="Card cap"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{cards.subType}</h5>
                        <p className="card-text">Card Description</p>
                        <a href={`/apply-new/${cards.id}`}>
                          <button type="button" class="btn btn-warning">
                            Apply
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </Fragment>
          );
        })}
      </div>
      {/* Premium Cards */}
      <div className="row my-5">
        <legend>Premium Credit Cards</legend>
        {getAllCards.map((cards) => {
          return (
            <Fragment>
              {cards.category === "Premium" ? (
                <div className="col-6 col-md-4">
                  <div className="card-deck">
                    <div className="card" key={cards.id}>
                      <img
                        className="rounded  float-left w-5 p-2"
                        src={`http://localhost:5000/${cards.imageUrl}`}
                        alt="Card cap"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{cards.subType}</h5>
                        <p className="card-text">Card Description</p>
                        <a href={`/apply-new/${cards.id}`}>
                          <button type="button" class="btn btn-warning">
                            Apply
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </Fragment>
          );
        })}
      </div>

      {/* Super Premium Cards */}
      <div className="row my-5">
        <legend>Super Premium Credit Cards</legend>
        {getAllCards.map((cards) => {
          return (
            <Fragment>
              {cards.category === "Super Premium" ? (
                <div className="col-6 col-md-4">
                  <div className="card-deck">
                    <div className="card" key={cards.id}>
                      <img
                        className="rounded  float-left w-5 p-2"
                        src={`http://localhost:5000/${cards.imageUrl}`}
                        alt="Card cap"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{cards.subType}</h5>
                        <p className="card-text">Card Description</p>
                        <a href={`/apply-new/${cards.id}`}>
                          <button type="button" class="btn btn-warning">
                            Apply
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </Fragment>
          );
        })}
      </div>
    </>
  );
};

export default Dashboard;
