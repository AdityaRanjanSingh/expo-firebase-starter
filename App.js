import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { RootNavigator } from "./navigation/RootNavigator";
import { AuthenticatedUserProvider } from "./providers";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

const App = () => {
  return (
    <AuthenticatedUserProvider>
      <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaProvider>
          <RootNavigator />
        </SafeAreaProvider>
      </ApplicationProvider>
      </>
    </AuthenticatedUserProvider>
  );
};

export default App;
