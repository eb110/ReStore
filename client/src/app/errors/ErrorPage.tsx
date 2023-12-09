import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import agent from "../api/agent";
import { useState } from "react";

export default function ErrorPage() {
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const getValidationError = () => {
        agent.TestErrors.getValidationError()
        .then(() => console.log('should not see this'))
        .catch(error => setValidationErrors(error as string[]));
    }

    return (
        <Container>
            <Typography gutterBottom variant="h2">
                Errors for testing purposes
            </Typography>
            <ButtonGroup fullWidth>
                <Button variant="contained" onClick={():Awaited<Promise<object>> => agent.TestErrors.get400Error().catch(error => console.log(error))}>
                    Test 400 Error
                </Button>
                <Button variant="contained" onClick={(): Awaited<Promise<object>> => agent.TestErrors.get401Error().catch(error => console.log(error))}>
                    Test 401 Error
                </Button>
                <Button variant="contained" onClick={(): Awaited<Promise<object>> => agent.TestErrors.get404Error().catch(error => console.log(error))}>
                    Test 404 Error
                </Button>
                <Button variant="contained" onClick={(): Awaited<Promise<object>> => agent.TestErrors.get500Error().catch(error => console.log(error))}>
                    Test 500 Error
                </Button>
                <Button variant="contained" onClick={(): Awaited<Promise<void>> => getValidationError()}>
                    Test Validation Error
                </Button>
            </ButtonGroup>
            {validationErrors.length > 0 && 
                <Alert severity="error">
                    <AlertTitle>Validation Errors</AlertTitle>
                    <List>
                        {validationErrors.map(error => (
                            <ListItem key={error}>
                                <ListItemText>{error}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Alert>
            }
        </Container>
    )
}