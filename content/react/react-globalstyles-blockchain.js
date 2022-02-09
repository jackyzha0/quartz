import React, {useEffect} from "react";
import logo from './logo.svg';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {connect} from "./redux/blockchain/blockchainActions";
import * as s from "./styles/globalStyles";

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector(state => state.blockchain);

  console.table(blockchain);

  useEffect(() => {
    dispatch(connect());
  }, [dispatch]);

  return <s.Screen>
    <s.Container flex={1} ai={"center"} jc={"center"}>
      <s.TextTitle>
        Our game
      </s.TextTitle>
      <s.SpacerSmall />
      <button>CONNECT</button>
    </s.Container>
  </s.Screen>
}

export default App;
