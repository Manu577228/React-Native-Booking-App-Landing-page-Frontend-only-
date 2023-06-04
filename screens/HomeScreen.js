import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Image,
  Alert
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import { Feather } from "@expo/vector-icons";
import DatePicker from "react-native-date-ranges";
import { BottomModal } from "react-native-modals";
import { ModalFooter } from "react-native-modals";
import { ModalButton } from "react-native-modals";
import { ModalTitle } from "react-native-modals";
import { SlideAnimation } from "react-native-modals";
import { ModalContent } from "react-native-modals";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedDates, setSelectedDates] = useState();
  const route = useRoute();
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [modalVisibile, setModalVisibile] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "BharadwajTrips.com",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
      },
      headerStyle: {
        backgroundColor: "#003580",
        height: 110,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
      headerRight: () => (
        <Ionicons
          name="notifications-outline"
          size={24}
          color="white"
          style={{ marginRight: 12 }}
        />
      ),
    });
  }, []);
  const customButton = (onConfirm) => {
    return (
      <Button
        onPress={onConfirm}
        style={{
          container: { width: "80%", marginHorizontal: "3%" },
          text: { fontSize: 20 },
        }}
        primary
        title="Submit"
      />
    );
  };
  console.log(route.params);

  const searchPlaces = (place) => {
    if (!route.params || !selectedDates) {
      Alert.alert(
        "Invalid Details",
        "Please enter all the details",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }

    if (route.params && selectedDates) {
      navigation.navigate("Places", {
        rooms: rooms,
        adults: adults,
        children: children,
        selectedDates: selectedDates,
        place: place
      })
    }
  };

  return (
    <>
      <View>
        <Header />

        <ScrollView>
          <View
            style={{
              margin: 20,
              borderColor: "#FFC72C",
              borderWidth: 3,
              borderRadius: 6,
            }}
          >
            {/* Destination */}
            <Pressable
              onPress={() => navigation.navigate("Search")}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 10,
                borderColor: "#FFC72C",
                borderWidth: 2,
                paddingVertical: 15,
              }}
            >
              <Feather name="search" size={24} color="black" />
              <TextInput
                placeholderTextColor="black"
                placeholder={
                  route?.params ? route.params.input : "Enter Your Destination"
                }
              />
            </Pressable>

            {/* Selected Dates */}
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 10,
                borderColor: "#FFC72C",
                borderWidth: 2,
                paddingVertical: 15,
              }}
            >
              <Feather name="calendar" size={24} color="black" />
              <DatePicker
                style={{
                  width: 350,
                  height: 30,
                  borderRadius: 0,
                  borderWidth: 0,
                  borderColor: "transparent",
                }}
                customStyles={{
                  placeholderText: {
                    fontSize: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: "auto",
                  },
                  headerStyle: {
                    backgroundColor: "#003580",
                  },
                  contentText: {
                    fontSize: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: "auto",
                  },
                }}
                selectedBgColor="#0047AB"
                customButton={(onConfirm) => customButton(onConfirm)}
                onConfirm={(startDate, endDate) =>
                  setSelectedDates(startDate, endDate)
                }
                allowFontScaling={false}
                placeholder={"Select Your Dates"}
                mode={"range"}
              />
            </Pressable>

            {/* Rooms and Guests */}
            <Pressable
              onPress={() => setModalVisibile(!modalVisibile)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 10,
                borderColor: "#FFC72C",
                borderWidth: 2,
                paddingVertical: 15,
              }}
            >
              <Ionicons name="person-outline" size={24} color="black" />
              <TextInput
                placeholderTextColor="red"
                placeholder={` ${rooms} room • ${adults} adults • ${children} Children`}
              />
            </Pressable>

            {/* Search Button */}
            <Pressable
              onPress={() => searchPlaces(route?.params.input)}
              style={{
                paddingHorizontal: 10,
                borderColor: "#FFC72C",
                borderWidth: 2,
                paddingVertical: 15,
                backgroundColor: "#2a52be",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: "500",
                  color: "white",
                }}
              >
                Search
              </Text>
            </Pressable>
          </View>

          <Text
            style={{ marginHorizontal: 20, fontSize: 17, fontWeight: "500" }}
          >
            Travel More spend less
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Pressable
              style={{
                width: 200,
                height: 150,
                marginTop: 10,
                backgroundColor: "#003580",
                borderRadius: 10,
                padding: 20,
                marginHorizontal: 20,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: "bold",
                  marginVertical: 7,
                }}
              >
                Genius
              </Text>
              <Text style={{ color: "white", fontSize: 15, fontWeight: "500" }}>
                You are ate genius level one in our loyalty program
              </Text>
            </Pressable>

            <Pressable
              style={{
                width: 200,
                height: 150,
                marginTop: 10,
                borderColor: "#E0E0E0",
                borderWidth: 2,
                borderRadius: 10,
                padding: 20,
                marginHorizontal: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginVertical: 7,
                }}
              >
                15% Discounts
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                Complete 5 stays to unlock level 2
              </Text>
            </Pressable>

            <Pressable
              style={{
                width: 200,
                height: 150,
                marginTop: 10,
                borderColor: "#E0E0E0",
                borderWidth: 2,
                borderRadius: 10,
                padding: 20,
                marginHorizontal: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginVertical: 7,
                }}
              >
                10% Discounts
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                Enjoy Discounts at participating at properties worldwide
              </Text>
            </Pressable>
          </ScrollView>

          <Pressable
            style={{
              marginTop: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 200, height: 50, resizeMode: "cover" }}
              source={{
                uri: "data:image/jpeg;base64,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mKLDpjYisiddYb311ga9YFURLQ4hwvEXl7JdKMd7brzUltBYYtArdalId7upS5LP+tsa7ana3K2Bi83r5t+McTDpDXhXsse3yzrqs6EKbe2xF6Q2+ntrY1AqqJseYbq8jjNrYPl9DHYFKOlQJHfoR/iC732PpNdAREQEREBERAREQEREDkrlGBQ6I7gj1B+6YJ36zEQM7mIiBknfrG5iIGdxuYiBkMQexjcxEDkzlieo736795jcxEDO43MRAbmdzEQM7nJbWRSEJAbQIB0CAdjY9+4BnCICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiIH//2Q==",
              }}
            />
          </Pressable>
        </ScrollView>
      </View>

      <BottomModal
        swipeThreshold={200}
        onBackdropPress={() => setModalVisibile(!modalVisibile)}
        swipeDirection={["up", "down"]}
        footer={
          <ModalFooter>
            <ModalButton
              text="Apply"
              style={{
                marginBottom: 20,
                color: "white",
                backgroundColor: "#003580",
              }}
              onPress={() => setModalVisibile(!modalVisibile)}
            />
          </ModalFooter>
        }
        modalTitle={<ModalTitle title="Select rooms and guests" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisibile(!modalVisibile)}
        visible={modalVisibile}
        onTouchOutside={() => setModalVisibile(!modalVisibile)}
      >
        <ModalContent style={{ width: "100%", height: 310 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 15,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Rooms</Text>
            <Pressable
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Pressable
                onPress={() => setRooms(Math.max(1, rooms - 1))}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6,
                  }}
                >
                  -
                </Text>
              </Pressable>

              <Pressable>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: "500",
                    paddingHorizontal: 6,
                  }}
                >
                  {rooms}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setRooms((c) => c + 1)}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6,
                  }}
                >
                  +
                </Text>
              </Pressable>
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 15,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Adults</Text>
            <Pressable
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Pressable
                onPress={() => setAdults(Math.max(1, adults - 1))}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6,
                  }}
                >
                  -
                </Text>
              </Pressable>

              <Pressable>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: "500",
                    paddingHorizontal: 6,
                  }}
                >
                  {adults}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setAdults((c) => c + 1)}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6,
                  }}
                >
                  +
                </Text>
              </Pressable>
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 15,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Children</Text>
            <Pressable
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Pressable
                onPress={() => setChildren(Math.max(0, children - 1))}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6,
                  }}
                >
                  -
                </Text>
              </Pressable>

              <Pressable>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: "500",
                    paddingHorizontal: 6,
                  }}
                >
                  {children}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setChildren((c) => c + 1)}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6,
                  }}
                >
                  +
                </Text>
              </Pressable>
            </Pressable>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});