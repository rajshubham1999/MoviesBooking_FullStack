import React from 'react';
import { useState, useEffect } from "react";
import { Row, Col, Carousel, Input,message } from 'antd';
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GetAllMovies } from "../../apicalls/movies.js";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice.js";

const ContentStyle = {
  height: '360px',
  color: '#fff',
  lineHeight: '180px',
  textAlign: 'center',
  backgroundSize: 'cover', // Ensures the background image covers the entire area
};

function Home() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllMovies();
      if (response.success) {
        setMovies(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>
        <Carousel autoplay>
          <div>
            <h3 style={{ ...ContentStyle, backgroundImage: 'url("https://assets-in.bmscdn.com/promotions/cms/creatives/1706869454858_web.jpg")' }}></h3>
          </div>
          <div>
            <h3 style={{ ...ContentStyle, backgroundImage: 'url("https://assets-in.bmscdn.com/promotions/cms/creatives/1706382336630_web.jpg")' }}></h3>
          </div>
          <div>
            <h3 style={{ ...ContentStyle, backgroundImage: 'url("https://assets-in.bmscdn.com/promotions/cms/creatives/1703669272395_lolladesktop.jpg")' }}></h3>
          </div>
          <div>
            <h3 style={{ ...ContentStyle, backgroundImage: 'url("https://assets-in.bmscdn.com/promotions/cms/creatives/1703248282439_1240x300.jpg")' }}></h3>
          </div>
        </Carousel>
      </div>
      <div>
        <input
          style={{ width: "90%" }}
          type="text"
          className="search-input"
          placeholder="Search for movies"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <h1 className="text-md uppercase mb-3">Currently showing Movies</h1>
        <Row gutter={[20]} className="mt-2">
          {movies
            .filter((movie) =>
              movie.title.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((movie,index) => (
              <Col xs={12} sm={8} md={6} lg={4} span={4} key={index}>
                <div
                  style={{ maxWidth: "190px" }}
                  className="card flex flex-col gap-3 cursor-pointer"
                  onClick={() =>
                    navigate(
                      `/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`
                    )
                  }
                >
                  <img src={movie.poster} alt="" height={180} width={190} style={{ maxHeight: '200px', width: '100%' }} />

                  <div className="flex justify-center p-1">
                    <h1 className="text-md uppercase">{movie.title}</h1>
                  </div>
                </div>
              </Col>
            ))}
        </Row>

      </div>

    </div>

  )
}

export default Home;




