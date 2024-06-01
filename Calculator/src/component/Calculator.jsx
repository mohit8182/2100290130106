import React, { useState } from "react";
import axios from "axios";
import { AUTORIZATION_TOKEN, EVEN_NUMBER, FIBONACCI_NUMBER, PRIME_NUMBER } from "./api.js";
import { Button, Card, Col, Row, Typography, message, Spin, Space } from "antd";

const { Title, Text } = Typography;

const Calculator = () => {
    const [primeNumber, setPrimeNumber] = useState([]);
    const [evenNumber, setEvenNumber] = useState([]);
    const [fibonacciNumber, setFibonacciNumber] = useState([]);
    const [randomNumber, setRandomNumber] = useState([]);
    const [prevPrimeNumbers, setPrevPrimeNumbers] = useState([]);
    const [prevEvenNumbers, setPrevEvenNumbers] = useState([]);
    const [prevFibonacciNumbers, setPrevFibonacciNumbers] = useState([]);
    const [prevRandomNumbers, setPrevRandomNumbers] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleError = (err) => {
        if (err.code === "ECONNABORTED") {
            message.error("Request TimeOut");
        } else {
            message.error(err.message);
        }
    };

    const loadPrimeNumber = async () => {
        setLoading(true);
        try {
            const response = await axios.get(PRIME_NUMBER, {
                headers: {
                    Authorization: `Bearer ${AUTORIZATION_TOKEN}`
                },
            });
            setPrevPrimeNumbers(primeNumber);
            setPrimeNumber(response.data.numbers);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const loadEvenNumber = async () => {
        setLoading(true);
        try {
            const response = await axios.get(EVEN_NUMBER, {
                headers: {
                    Authorization: `Bearer ${AUTORIZATION_TOKEN}`
                },
            });
            setPrevEvenNumbers(evenNumber);
            setEvenNumber(response.data.numbers);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const loadFibonacciNumber = async () => {
        setLoading(true);
        try {
            const response = await axios.get(FIBONACCI_NUMBER, {
                headers: {
                    Authorization: `Bearer ${AUTORIZATION_TOKEN}`
                },
            });
            setPrevFibonacciNumbers(fibonacciNumber);
            setFibonacciNumber(response.data.numbers);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const loadRandomNumber = async () => {
        setLoading(true);
        try {
            const response = await axios.get(EVEN_NUMBER, {
                headers: {
                    Authorization: `Bearer ${AUTORIZATION_TOKEN}`
                },
            });
            setPrevRandomNumbers(randomNumber);
            setRandomNumber(response.data.numbers);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const calculateAverage = (numbers) => {
        if (numbers.length === 0) return 0;
        const sum = numbers.reduce((acc, curr) => acc + curr, 0);
        return sum / numbers.length;
    };

    const formatResponse = (prevNumbers, currNumbers) => {
        const mergedNumbers = [...new Set([...prevNumbers, ...currNumbers])].sort((a, b) => a - b);
        const avg = calculateAverage(currNumbers);
        return {
            windowPrevState: prevNumbers,
            windowCurrState: currNumbers,
            numbers: mergedNumbers,
            avg: avg.toFixed(2)
        };
    };

    const renderNumberSection = (title, fetchFunction, prevNumbers, currNumbers) => (
        <Card style={{ marginBottom: 20 }}>
            <Row align="middle" gutter={16}>
                <Col span={6}>
                    <Title level={4}>{title}</Title>
                </Col>
                <Col span={6}>
                    <Button
                        type="primary"
                        size="large"
                        style={{ borderRadius: "5px", background: "#05377B", borderColor: "#05377B" }}
                        onClick={fetchFunction}
                    >
                        Fetch {title}
                    </Button>
                </Col>
                <Col span={12}>
                    <Space direction="vertical">
                        <Text><b>Previous State:</b> {prevNumbers?.join(", ")}</Text>
                        <Text><b>Current State:</b> {currNumbers?.join(", ")}</Text>
                        <Text><b>Fetched Numbers:</b> {formatResponse(prevNumbers, currNumbers).numbers.join(", ")}</Text>
                        <Text><b>Average:</b> {formatResponse(prevNumbers, currNumbers).avg}</Text>
                    </Space>
                </Col>
            </Row>
        </Card>
    );

    return (
        <Card style={{ borderRadius: "20px", boxShadow: "0px 3px 6px #00000012", padding: 20 }}>
            <Spin spinning={loading}>
                {renderNumberSection("Prime Numbers", loadPrimeNumber, prevPrimeNumbers, primeNumber)}
                {renderNumberSection("Even Numbers", loadEvenNumber, prevEvenNumbers, evenNumber)}
                {renderNumberSection("Fibonacci Numbers", loadFibonacciNumber, prevFibonacciNumbers, fibonacciNumber)}
                {renderNumberSection("Random Numbers", loadRandomNumber, prevRandomNumbers, randomNumber)}
            </Spin>
        </Card>
    );
};

export default Calculator;
