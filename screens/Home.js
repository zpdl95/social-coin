import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { coins } from "../api";
import { BLACK_COLOR } from "../colors";
import Coin from "../components/Coin";

const Container = styled.View`
  background-color: ${BLACK_COLOR};
  flex: 1;
`;

const Loader = styled.View`
  background-color: ${BLACK_COLOR};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Home = () => {
  const [cleanData, setCleanData] = useState([]);
  const { isLoading, data } = useQuery("coins", coins);

  useEffect(() => {
    if (data) {
      setCleanData(
        data.filter((coin) => coin.rank != 0 && coin.is_active && !coin.is_new)
      );
    }
  }, [data]);

  return isLoading ? (
    <Loader>
      <ActivityIndicator color={"white"} />
    </Loader>
  ) : (
    <Container>
      <FlatList
        indicatorStyle="white"
        /* 한 행이 1개의 컴포넌트가 됐기때문에 이것을 사용하면 행단위로 적용된다 */
        ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
        /* numColumns = 컬럼생성 */
        numColumns={3}
        /* columnWrapperStyle = 컬럼 스타일 설정, 생성된 컬럼갯수만큼 묶어서 wrapper이 만들어짐 */
        columnWrapperStyle={{ justifyContent: "space-evenly" }}
        data={cleanData}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Coin id={item.id} index={index} symbol={item.symbol} />
        )}
      />
    </Container>
  );
};
export default Home;
