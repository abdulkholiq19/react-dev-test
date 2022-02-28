import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  Container,
  Card,
  Row,
  Col
} from 'react-bootstrap';

import { API } from "../config/API";

import { LoadingComponent } from "../components/LoadingComponent";

export const DetailMovie = () => {
  let { id } = useParams();
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({});

  const getMovieId = async () => {
    try {
      const response = await API.get(`?apikey=faf7e5bb&i=${id}`);

      setData(response.data);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setLoading(true)
    getMovieId();
  }, []);
  
  return (
    <>
    <div>{loading && <LoadingComponent />}</div>
    {!loading && 
    (
      <>
      <Container>
      <div class="text-center mt-5 mb-5 h2 text-capitalize">
        <strong className="font-weight-bold text-warning">{data.Title}</strong>
      </div>  
    </Container>
    <Container className="d-flex justify-content-center">
      <Card className="mt-3 w-50 border-0" style={{height: "12rem", background: "black"}}>
      <Row> 
        <Col md="4">
        <Card.Img
          className="w-100"
          style={{objectFit: "cover", cursor: "pointer"}}
          variant="top"
          src={data.Poster}
          />
        </Col>
        <Col md="8">
        <Card.Body className="p-0">
          <Card.Title className="w-100 text-white">Year : <b>{data.Year}</b></Card.Title>
          <Card.Title className="w-100 text-white">Released : <b>{data.Released}</b></Card.Title>
          <Card.Title className="w-100 text-white">Language : <b>{data.Language}</b></Card.Title>
          <Card.Title className="w-100 text-white">Country : <b>{data.Country}</b></Card.Title>
          <Card.Title className="w-100 text-white">Awards : <b>{data.Awards}</b></Card.Title>
          <Card.Title className="w-100 text-white">Actors : <b>{data.Actors}</b></Card.Title>
        </Card.Body>
        </Col>
      </Row>
      <Card.Body className="mt-3 p-0">
        <Card.Title className="w-100 text-white">{data.Plot}</Card.Title>
      </Card.Body>
    </Card>
    </Container>
    </>
    )}
    </>
  )
}
