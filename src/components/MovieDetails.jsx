import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=67456ba989bda984bbc528b1ff68d913&language=en-US`
                );
                setMovie(response.data);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (!movie) {
        return <h2 className="text-center my-5">Loading...</h2>;
    }

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="shadow-lg">
                        <Card.Img
                            variant="top"
                            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "fallback-image-url.jpg"}
                            alt={movie.title}
                        />
                        <Card.Body>
                            <Card.Title className="text-center">{movie.title}</Card.Title>
                            <Card.Text>
                                <strong>Release Date:</strong> {movie.release_date}
                            </Card.Text>
                            <Card.Text>
                                <strong>Rating:</strong> {movie.vote_average} ⭐
                            </Card.Text>
                            <Card.Text>
                                <strong>Overview:</strong> {movie.overview}
                            </Card.Text>
                            <div className="text-center">
                                <Link to="/" className="btn btn-primary">Back to Home</Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default MovieDetails;
