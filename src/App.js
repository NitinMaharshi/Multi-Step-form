import LinearStepper from "./Components/LinearStepper";
import { CssBaseline, Container, Paper, Box } from "@material-ui/core";
import Router from "./Router/Router";

function App() {
  return (
    <>
      <CssBaseline />
      <Container component={Box} p={4}>
        <Paper component={Box} p={3}>
          <Router />
        </Paper>
      </Container>
    </>
  );
}

export default App;
