import ReactDOM from "react-dom/client";
import {ChakraProvider, defaultSystem} from "@chakra-ui/react";
import {App} from "@/app";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ChakraProvider value={defaultSystem}>
        <App />
    </ChakraProvider>
);
