import React, { useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { history, info } from "../api";
import { Icon } from "../components/Coin";

const DetailText = styled.Text`
  color: white;
  font-size: 20px;
  margin-left: 10px;
`;

const Detail = ({
  navigation,
  route: {
    params: { symbol, id },
  },
}) => {
  const { infoIsLoading, infoData } = useQuery(["coinInfo", id], info);
  const { historyIsLoading, historyData } = useQuery(
    ["coinHistory", id],
    history
  );

  useEffect(() =>
    navigation.setOptions({
      headerTitle: () => (
        <>
          <Icon
            source={{
              uri: `https://cryptoicon-api.vercel.app/api/icon/${symbol.toLowerCase()}`,
            }}
          />
          <DetailText>{symbol}</DetailText>
        </>
      ),
    })
  );
  return null;
};
export default Detail;
