
import { Row, Col, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../style.css";
import axios from "axios";

const MovieCard = ({ movie }) => {
    return (
        <Card className="my-3 movie-card">
            <Card.Img
                variant="top"
                src={movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "fallback-image-url.jpg"}
                alt={movie?.title}
            />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                    {movie.overview.slice(0, 100)}...
                </Card.Text>
                <Link to={`/movie/${movie.id}`} className="btn btn-primary">View Details</Link>
            </Card.Body>
        </Card>
    );
};

function MovieList() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(
                    "https://api.themoviedb.org/3/movie/now_playing?api_key=67456ba989bda984bbc528b1ff68d913&language=en-US&page=1"
                );
                console.log("Fetched Movies:", response.data.results); 
                setMovies(response.data.results);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <Container>
            <h2 className="text-center my-4">Movies Listing</h2>
            <Row>
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
                            <MovieCard movie={movie} />
                        </Col>
                    ))
                ) : (
                    <p className="text-center">No movies found.</p>
                )}
            </Row>
        </Container>
    );
}

export default MovieList;
