import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

import useIA from '@/hooks/useIA.ts';
import { Message } from '@/database/models/Messages.ts';
import CardChatMessage from '@/components/cards/CardChatMessage.tsx';
import { CURRENT_THEME, loadThemeFromDB } from '@/theme/ThemeManager.ts';

const renderListCommands = (
  showCommands: boolean,
  handlePrompt: (prompt: string) => void,
  commands: Array<{
    id: number;
    command: string;
    name: string;
    surname: string;
    placeHolderInfo: string;
  }>,
  setPlaceHolderInput: (value: string) => void,
  executeCommand: (command: string) => void,
  styles: any,
) => {
  if (showCommands) {
    return (
      <View style={styles.commandWrapper}>
        <FlatList
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          horizontal
          data={commands}
          keyExtractor={item => String(item.id)}
          renderItem={item => (
            <Text
              style={styles.commandItem}
              onPress={() => {
                executeCommand(item.item.command);
                setPlaceHolderInput(item.item.placeHolderInfo);
              }}
            >
              {item.item.surname}
            </Text>
          )}
        />
      </View>
    );
  }
};

const Chat = () => {
  const flatListRef = useRef<FlatList>(null);


  useEffect(() => {
    const loadTheme = async () => {
      await loadThemeFromDB();
    };
    loadTheme();
  }, []);
  const theme = CURRENT_THEME;
  const styles = styleBase(theme);

  const {
    handlePrompt,
    prompt,
    loadState,
    generating,
    messages,
    showCommands,
    sendMessage,
    commands,
    stopGeneration,
    placeHolderInput,
    setPlaceHolderInput,
    executeCommand,
    fakeStream,
  } = useIA();

  const renderItem = useCallback(
    ({ item }: { item: Message }) => (
      <CardChatMessage
        item={item}
        isGenerating={generating}
        thinking={loadState}
        fakeStream={fakeStream}
      />
    ),
    [generating, loadState],
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        onContentSizeChange={() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }}
      />

      <View style={styles.inputContainer}>
        <TextInput
          value={prompt}
          onChangeText={handlePrompt}
          placeholder={placeHolderInput}
          placeholderTextColor={theme.colors.textSecondary}
          style={styles.input}
        />

        <TouchableOpacity
          onPress={() => {
            if (generating) {
              stopGeneration();
              return;
            }
            sendMessage();
          }}
          style={[styles.sendButton, generating && styles.sendButtonStop]}
        >
          <Text style={[styles.sendText, generating && styles.sendTextStop]}>
            {generating ? '■' : '➜'}
          </Text>
        </TouchableOpacity>
      </View>

      {showCommands && (
        <View style={styles.commandsContainer}>
          {renderListCommands(
            showCommands,
            handlePrompt,
            commands,
            setPlaceHolderInput,
            executeCommand,
            styles,
          )}
        </View>
      )}
    </View>
  );
};

export default Chat;
const styleBase = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    listContent: {
      padding: 20,
    },

    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 16,
      marginBottom: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: theme.colors.surfaceContainerLow,
      borderRadius: 28,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.08)',
    },

    input: {
      flex: 1,
      color: theme.colors.text,
      fontSize: 16,
      paddingVertical: 0,
    },

    sendButton: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor: theme.colors.primaryContainer,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 12,
    },

    sendButtonStop: {
      backgroundColor: theme.colors.errorContainer,
    },

    sendText: {
      color: theme.colors.onPrimaryContainer,
      fontWeight: '600',
    },

    sendTextStop: {
      color: theme.colors.error,
    },

    commandsContainer: {
      paddingHorizontal: 16,
      paddingBottom: 16,
      backgroundColor: theme.colors.background,
    },

    commandWrapper: {
      flexDirection: 'row',
      padding: 12,
    },

    commandItem: {
      marginRight: 12,
      borderRadius: 15,
      fontWeight: '500',
      backgroundColor: 'black',
      color: 'white',
      textAlign: 'center',
      padding: 10,
    },
  });