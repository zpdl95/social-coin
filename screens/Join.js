import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import auth from "@react-native-firebase/auth";
import { BLACK_COLOR } from "../colors";
import { ActivityIndicator, Alert } from "react-native";

const Container = styled.View`
  background-color: ${BLACK_COLOR};
  flex: 1;
  align-items: center;
  color: white;
  padding: 60px 20px;
`;

const TextInput = styled.TextInput`
  width: 100%;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 10px;
  font-size: 16px;
  color: white;
  background-color: rgba(255, 255, 255, 0.5);
`;

const Btn = styled.TouchableOpacity`
  width: 100%;
  padding: 10px 20px;
  border-width: 1px;
  border-radius: 20px;
  border-color: rgba(255, 255, 255, 0.5);
  justify-content: center;
  align-items: center;
`;

const BtnText = styled.Text`
  color: white;
  font-size: 16px;
`;

const Join = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const passwordInput = useRef();

  /* useRef()를 사용해서 email칸에서 password칸으로 이동 */
  const onSubmitEmailEditing = () => {
    passwordInput.current.focus();
  };
  const onSubmitPasswordEditing = async () => {
    if (email === "" || password === "") {
      Alert.alert("Error!", "Please fill in the email and password");
      return;
    }
    setLoading(true);
    /* 로딩중이면 두번 누를 수도 있기에 버튼무효화 */
    if (loading) {
      return;
    }
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (e) {
      setLoading(false);
      switch (e.code) {
        case "auth/email-already-in-use": {
          Alert.alert("이미 존재하는 이메일 입니다");
        }
        case "auth/invalid-email": {
          Alert.alert("잘못된 이메일 입니다");
        }
        case "auth/weak-password": {
          Alert.alert("강력한 비밀번호를 만드세요");
        }
      }
    }
  };
  return (
    <Container>
      <TextInput
        value={email}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        keyboardType="email-address"
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        onSubmitEditing={onSubmitEmailEditing}
        placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
      />
      <TextInput
        ref={passwordInput}
        value={password}
        returnKeyType="done"
        secureTextEntry
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        onSubmitEditing={onSubmitPasswordEditing}
        placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
      />
      <Btn onPress={onSubmitPasswordEditing}>
        {loading ? (
          <ActivityIndicator color={"white"} />
        ) : (
          <BtnText>Create Account</BtnText>
        )}
      </Btn>
    </Container>
  );
};
export default Join;
