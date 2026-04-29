import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../hooks/AppContext';

// Auth Screens
import { HomeScreen } from '../screens/auth/HomeScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { SignupScreen } from '../screens/auth/SignupScreen';

// Main Screens
import { DashboardScreen } from '../screens/main/DashboardScreen';
import { CoursesScreen } from '../screens/main/CoursesScreen';
import { CourseDetailScreen } from '../screens/main/CourseDetailScreen';
import { LessonScreen } from '../screens/main/LessonScreen';
import { EditorScreen } from '../screens/main/EditorScreen';
import { AIAssistantScreen } from '../screens/main/AIAssistantScreen';
import { CommunityScreen } from '../screens/main/CommunityScreen';
import { RoadmapsScreen } from '../screens/main/RoadmapsScreen';
import { LeaderboardScreen } from '../screens/main/LeaderboardScreen';
import { ProjectsScreen } from '../screens/main/ProjectsScreen';
import { CertificatesScreen } from '../screens/main/CertificatesScreen';
import { ProfileScreen } from '../screens/main/ProfileScreen';
import { SettingsScreen } from '../screens/main/SettingsScreen';
import { MoreScreen } from '../screens/main/MoreScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const CoursesStack = createNativeStackNavigator();
const MoreStack = createNativeStackNavigator();

function CoursesStackNavigator() {
  return (
    <CoursesStack.Navigator screenOptions={{ headerShown: false }}>
      <CoursesStack.Screen name="CoursesList" component={CoursesScreen} />
      <CoursesStack.Screen name="CourseDetail" component={CourseDetailScreen} />
      <CoursesStack.Screen name="Lesson" component={LessonScreen} />
    </CoursesStack.Navigator>
  );
}

function MoreStackNavigator() {
  return (
    <MoreStack.Navigator screenOptions={{ headerShown: false }}>
      <MoreStack.Screen name="MoreMenu" component={MoreScreen} />
      <MoreStack.Screen name="Community" component={CommunityScreen} />
      <MoreStack.Screen name="Roadmaps" component={RoadmapsScreen} />
      <MoreStack.Screen name="Leaderboard" component={LeaderboardScreen} />
      <MoreStack.Screen name="Projects" component={ProjectsScreen} />
      <MoreStack.Screen name="Certificates" component={CertificatesScreen} />
      <MoreStack.Screen name="Profile" component={ProfileScreen} />
      <MoreStack.Screen name="Settings" component={SettingsScreen} />
    </MoreStack.Navigator>
  );
}

function MainTabs() {
  const { t, colors } = useApp();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.tabBarBorder,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          switch (route.name) {
            case 'DashboardTab': iconName = 'home'; break;
            case 'CoursesTab': iconName = 'book'; break;
            case 'EditorTab': iconName = 'code-slash'; break;
            case 'AITab': iconName = 'sparkles'; break;
            case 'MoreTab': iconName = 'grid'; break;
          }
          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="DashboardTab" component={DashboardScreen} options={{ tabBarLabel: t('nav.dashboard') }} />
      <Tab.Screen name="CoursesTab" component={CoursesStackNavigator} options={{ tabBarLabel: t('nav.courses') }} />
      <Tab.Screen name="EditorTab" component={EditorScreen} options={{ tabBarLabel: t('nav.editor') }} />
      <Tab.Screen name="AITab" component={AIAssistantScreen} options={{ tabBarLabel: 'AI' }} />
      <Tab.Screen name="MoreTab" component={MoreStackNavigator} options={{ tabBarLabel: 'More' }} />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

export function AppNavigator() {
  const { user, isDark } = useApp();

  return (
    <NavigationContainer>
      {user ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}
