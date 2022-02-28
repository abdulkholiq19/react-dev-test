import React, { useState, useContext, useEffect} from 'react'
import {
  Container,
  Card,
  Row,
  Col,
  Modal,
  Form,
  FormControl
} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import { API } from "../config/API";
import { LoadingComponent } from "../components/LoadingComponent";

const PAGE_NUMBER = 1;

export const Home = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [state, _] = useContext(UserContext);
  const [dataSearch, setDataSearch] = useState([])
  const [dataMovie, setDataMovie] = useState([])
  const [text, setText] = useState('')
  const [suggestion, setSuggestion] = useState([]);
  const [page, setPage] = useState(PAGE_NUMBER)
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(5)

  const handleClose = () => setShow(false);

  const showModal = (title, poster) => {
    setShow(true);
    setTitle(title);
    setImage(poster);
  };
  const selectMusic = (index) => {
    navigate(`/detail-movie/${index}`)
  };

  const onChangeHandler = (text) => {
    let matches = [];
    if(text.length > 0){
      matches = state?.movie?.filter(data => {
        const regex = new RegExp(`${text}`, "gi");
        return data.Title.match(regex)
      })
    }
    setSuggestion(matches)
    setText(text)
  }

  const getMovieBySearch = async (text) => {
    setLoading(true)
    try {
      const response = await API.get(`?apikey=faf7e5bb&t=${text}`);
      setDataSearch(response.data)
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  const onSuggestHandler = (text) => {
    setSuggestion([])
    setText(text)
    getMovieBySearch(text)
  }

  useEffect(() => {

    setLoading(true)
    const getMovie = async () => {
      try {
        const response = await API.get(`?apikey=faf7e5bb&s=Batman&page=${page}`);
        setDataMovie([...state.movie, ...response.data.Search]);
        setLoading(false)
  
      } catch (error) {
        console.log(error);
      }
    };
    getMovie();
  }, [page]);

  const scroolToEnd = () => {
    setVisible(visible + 5)
    setPage(page + 1);
  }

  window.onscroll = function (){
    if(
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight
    ){
      scroolToEnd()
    }
  }

  const renderDataMovie = () => {
    return(
      dataMovie.slice(0, visible).map((item, index) => {
       return (
         <Container key={index} className="d-flex justify-content-center">
           <Card className="mt-5 w-50 border-0 rounded-0" style={{height: "12rem"}} key={index}>
           <Row> 
             <Col md="4">
             <Card.Img
               className="w-100 rounded-0"
               style={{objectFit: "cover", height: "12rem", cursor: "pointer"}}
               variant="top"
               src={item.Poster}
               onClick={() => showModal(item.Title, item.Poster)}
               />
             </Col>
             <Col md="8">
             <Card onClick={() => selectMusic(item.imdbID)} className="h-75 pt-3 border-0">
               <Card.Title className="w-100">{item.Title}</Card.Title>
               <Card.Text>{item.Year}</Card.Text>
             </Card>
             </Col>
           </Row>
         </Card>
        </Container>
       )
     })
    )
  }
  return (
    <>
    <div>{loading && <LoadingComponent />}</div>
      <Container className="mt-4 w-25">
        <Form>
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={e => onChangeHandler(e.target.value)}
            value={text}
          />
        </Form>
        {suggestion && suggestion.map((suggestion, i) => 
        <Card
          key={i}
          className="p-1 cursor-pointer"
          onClick={() => onSuggestHandler(suggestion.Title)}
          >
          {suggestion.Title}
        </Card>
        )}
      </Container>
        {dataSearch.length !== 0 ? (
            <Container className="d-flex justify-content-center">
              <Card className="mt-4 w-50 border-0 rounded-0" style={{height: "12rem"}}>
              <Row> 
                <Col md="4">
                <Card.Img
                  className="w-100"
                  style={{objectFit: "cover", height: "12rem", cursor: "pointer"}}
                  variant="top"
                  src={dataSearch.Poster}
                  onClick={() => showModal(dataSearch.Title, dataSearch.Poster)}
                  />
                </Col>
                <Col md="8">
                <Card onClick={() => selectMusic(dataSearch.imdbID)} className="h-75 pt-3 border-0">
                  <Card.Title className="w-100">{dataSearch.Title}</Card.Title>
                  <Card.Text>{dataSearch.Year}</Card.Text>
                </Card>
                </Col>
              </Row>
            </Card>
           </Container>
          )
         :renderDataMovie()
        }
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Card.Title>{title}</Card.Title>
        </Modal.Header>
        <Modal.Body>
          <Card.Img
            className="w-100"
            style={{objectFit: "cover"}}
            variant="top"
            src={image}
          />
        </Modal.Body>
      </Modal>

    </>
  )
}
