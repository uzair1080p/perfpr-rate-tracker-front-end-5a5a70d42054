import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { Provider as StoreProvider } from 'react-redux';
import Splash from './src/components/Splash';
import Router from './src/Router';
import store from './src/redux/store';
import * as Font from "expo-font";

export default function App(){
  const [loaded, setLoaded] = useState(false);

  /*const src = "iVBORw0KGgoAAAANSUhEUgAAAJgAAACYCAMAAAAvHNATAAAANlBMVEVHcEwOW6f///8IVqUPW6gQXKgRXKkPW6gTYKwPW6gbYqsxcbJ3ocza5vDs8/b0+Pmlwt1Vir96WNmQAAAACnRSTlMA////5HhLoCDGuAtrFAAABQNJREFUeNrt3H9vpCAQBuACIuC6wn7/L3vuXttb8UX5MdjJpVya3D9tngDiqDPz8dE67KiNcc4NgxDDsP7HGD3aj58cVhu3avAYnNE/wbOjSZredObauctCveGuWsAC1aet/6Ja7UTVcF1t1oiGYSxLVjdaO6sLjYZFT9OTIBuTpju2nCAdbmS2irTrOQ6iwxiaJ02LTqNtp9n07lJT7kjtNNtjGdUt3JfMMSvq5Uwvo3osMn+kZLXLaTDp9jyL7rJkBJGgGTKXeCw3teqKXH6VCTKZw/Pl/RM2y8KRnDNHcjk+t1YdTIZJUVycdsCX4rrlK2Fp2WBb11Hcnlu+FibvU/tq4nV8uaphXt5vrTJz4KqfMemTMtNyTny6GmBStsnwef99pLbA5JKSZdwDRnzH/j7qm2ByeSRkY9VBoaYgKWA+LTs9NNAFqUSQkmbG1t9PyFzNBguSDiZ9ItjQxRts42qHJWVj6QYLkhaWCtAOtpk5d5HAEjJTtJCxgQSWCNDG/CtyT6CB4QDNZV+RQEAEwzJ4ZdoJBazdYDBAm2zWzkcuOhgM0MD+t3kuQphHMns+YYlnRzoYDNDM6YS9Avy+MBig2bMJS7hoYUBmjifsK5DuDQNhkD2asLSLGuZ3MnMwYQcuahiYM5s+9NdA2l8G24WOOnWXVIfvcuhhcYDmEiv5HuBfA4vDIAtX8uXyJ7DHnXg88FoOyUAaw8REPjahLAwQg8yArSFL0b+/v5L8UYmA0aQD6RSs7zC7lVx3te8CU2dDgLW04A0FMWwKx2OO/qiNt1gnmLqdrUP0MWCMt1g32FJ2/Jv4sPg5mAwq3mRWsIDdp3iTaY4wHYVibGAmiizYwFx0o2QDe+5+wREmoliMD8xuQws+sHEb7vOB6e2DGx+Y4QtzPGHuF1YMG3jCBr4wwRMm+MJ+91gp7Pcc+29gv9FFKYxtoMg2tGb7MML28Y3vAy/bVwRsX6qwfQ3F9sUdk1edG9jA5+XwFmbi1+mKCWyMP0BkfO+7BGb3H98CB9gAvtRP890fjqUTbJn2H7m2eWPT7XjUfOLK+DLyPmMj/JAqSr6TkcHeM0OG/jU+2bDNBtHwY70iHxmwbe6FRekN6jETj+fH/RPY1uVwQsitrIAmK3XhBBZlhGicQnOSdtEBFmeq2FTSEbHsDBYnEpuDNK1wHczvknXtUWJbuG7GZnWcC7hN71HhKtiszrInzVY2XwML6jTf1J7kWHeBhdPcSZANOPvusH1as8lIacb5uZSwkJfSvLuVE8mSMJBsrfPS5svqTkthwOVyCw1IZBDmYQr4mFuaoRTBLR3PWGZqerKYhUAGYagK7qhmahT0MgSD1XljWcFUswzAoEuXlpg9AzRPCoNPgK6iKK8tQNvBYF3eeSXvKIhlMQzXC45VhZ+qJUCLYLhaUNeWyjYEaFsYdjUU8dbLtrC5wYVrzapDx3cYrmBsLRSf606Nd1irK1FoObfCoGsoa0YAa3mrArR/sADnq7SDCZYtDbDQuo5H12aF7AsG6xapWoSoCtknDNagVrnw+7zyYOMF87DdRXXvHtgep1D2Kn65IVdLtyN0cRbO2WvLT8Dl2vpD6TbZkuw/09zsCyynmkrec8IxEHT6svDqzH8zDK9GmrZt1Y3RUj1U6Do+Mm0lx7j5Ht92hYwbPDJuicm4iSjjtqucG9Vybu37vagMmyG/z12X9tF/APITr9CCbDsMAAAAAElFTkSuQmCC";

  return (
    <View>
      <Image source={{uri: `data:image/png;base64,${src}`}} style={{width: 100, height: 100}} />
    </View>
  );*/

  useEffect(() => {
    Font.loadAsync({
      "nunito-sans-black": require("./assets/fonts/NunitoSans-Black.ttf"),
      "nunito-sans-black-italic": require("./assets/fonts/NunitoSans-BlackItalic.ttf"),
      "nunito-sans-bold": require("./assets/fonts/NunitoSans-Bold.ttf"),
      "nunito-sans-bold-italic": require("./assets/fonts/NunitoSans-BoldItalic.ttf"),
      "nunito-sans-extra-bold": require("./assets/fonts/NunitoSans-ExtraBold.ttf"),
      "nunito-sans-extra-bold-italic": require("./assets/fonts/NunitoSans-ExtraBoldItalic.ttf"),
      "nunito-sans-extra-light": require("./assets/fonts/NunitoSans-ExtraLight.ttf"),
      "nunito-sans-extra-light-italic": require("./assets/fonts/NunitoSans-ExtraLightItalic.ttf"),
      "nunito-sans-italic": require("./assets/fonts/NunitoSans-Italic.ttf"),
      "nunito-sans-light": require("./assets/fonts/NunitoSans-Light.ttf"),
      "nunito-sans-light-italic": require("./assets/fonts/NunitoSans-LightItalic.ttf"),
      "nunito-sans-regular": require("./assets/fonts/NunitoSans-Regular.ttf"),
      "nunito-sans-semi-bold": require("./assets/fonts/NunitoSans-SemiBold.ttf"),
      "nunito-sans-semi-bold-italic": require("./assets/fonts/NunitoSans-SemiBoldItalic.ttf")
    })
      .then(() => new Promise(resolve => setTimeout(resolve, 4000)))
      .then(() => {setLoaded(true)});
  }, []);

  return (
    <StoreProvider store={store}>
      {!loaded && <Splash/>}
      {loaded && <Router/>}
    </StoreProvider>
  )
}