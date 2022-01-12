import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { history, info } from "../api";
import { Icon } from "../components/Coin";
import { BLACK_COLOR } from "../colors";
import { VictoryChart, VictoryLine, VictoryScatter } from "victory-native";

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${BLACK_COLOR};
`;

const Detail = ({
  navigation,
  route: {
    params: { symbol, id },
  },
}) => {
  const [victoryData, setVictoryData] = useState(null);
  const { isLoading: infoLoading, data: infoData } = useQuery(
    ["coinInfo", id],
    info
  );
  const { isLoading: historyLoading, data: historyData } = useQuery(
    ["coinHistory", id],
    history
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Icon
          source={{
            uri: `https://cryptoicon-api.vercel.app/api/icon/${symbol.toLowerCase()}`,
          }}
        />
      ),
    });
  }, []);
  useEffect(() => {
    if (historyData) {
      setVictoryData(
        historyData.map((price) => ({
          x: new Date(price.timestamp).getTime(),
          y: price.price,
        }))
      );
    }
  }, [historyData]);

  return (
    <Container>
      {victoryData && (
        /* victory차트 생성 만들고싶으면 사이트에서 공부할것 */
        <VictoryChart height={360}>
          <VictoryLine
            animate
            data={victoryData}
            style={{ data: { stroke: "#00b894" } }}
          />
          <VictoryScatter
            data={victoryData}
            style={{ data: { fill: "#55efc4" } }}
          />
        </VictoryChart>
      )}
    </Container>
  );
};
export default Detail;
