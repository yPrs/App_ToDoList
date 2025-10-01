import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Slide from '../Pages/slides';
import Acessos from "../Pages/Acessos";
import Login from "../Pages/login";
import Cadastro from "../Pages/cadastro";
import Home from "../Pages/Home";

export default function Rotas(){
    const Stack = createStackNavigator();
    
    return(
        <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen
                    name="Slide"
                    component={Slide}
                />
                <Stack.Screen
                    name="Acessos"
                    component={Acessos}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                />
                <Stack.Screen
                    name="Cadastro"
                    component={Cadastro}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}