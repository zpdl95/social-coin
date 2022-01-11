import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import { Animated, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

const Wrapper = styled(Animated.createAnimatedComponent(View))`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 5px;
  align-items: center;
`;
const CoinName = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

export const Icon = styled.Image`
  border-radius: 20px;
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
`;

const Coin = ({ symbol, index, id }) => {
  const navigation = useNavigation();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(opacity, {
      toValue: 1,
      useNativeDriver: true,
      delay: index * 100,
    }).start();
  }, []);

  const scale = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });

  return (
    <TouchableOpacity
      style={{ flex: 0.31 }}
      onPress={() => navigation.navigate("detail", { symbol, id })}
    >
      <Wrapper style={{ opacity, transform: [{ scale }] }}>
        {/* 해당 url로부터 심볼에 대한 아이콘을 받음, 그리고 사이즈를 정해줘야함 */}
        <Icon
          source={{
            uri: `https://cryptoicon-api.vercel.app/api/icon/${symbol.toLowerCase()}`,
          }}
        />
        <CoinName>{symbol}</CoinName>
      </Wrapper>
    </TouchableOpacity>
  );
};
/* memo는 컴포넌트의 prop이 변하지 않으면 이전에 저장된 prop을 바로 사용한다 */
/* memo는 주로 부모컴포넌트가 자주 리렌더링할때 사용. 이 경우 Home컴포넌트가 자주 리렌더링한다 */
export default React.memo(Coin);
