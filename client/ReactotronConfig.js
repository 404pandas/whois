import Reactotron, {
  openInEditor,
  devTools,
  networking,
  asyncStorage,
  trackGlobalErrors,
  trackGlobalLogs,
} from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: "Who Is",
  })
  .use(openInEditor())
  .use(devTools())
  .use(networking())
  .use(asyncStorage())
  .use(trackGlobalErrors())
  .use(trackGlobalLogs())
  .use(reactotronRedux())
  .connect();

export default reactotron;
