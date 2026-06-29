import React, { useMemo, useState, useRef, useEffect } from 'react';
import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ListRenderItem,
  Pressable,
  ScrollView,
  Animated,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useNote from '@/hooks/useNote';
import { DEFAULT_THEME, THEMES } from '@/theme/constants.ts';
import Icon from 'react-native-vector-icons/Ionicons';

interface Note {
  id: string;
  title: string;
  content: string;
  color: string;

  category?: string;

  is_pinned?: boolean;
  is_archived?: boolean;
  is_favorite?: boolean;
  is_deleted?: boolean;

  created_at?: number;
  updated_at?: number;
}


interface NoteCardProps {
  note: Note;
  onPress: (note: Note) => void;
}

function NoteCard({ note, onPress }: NoteCardProps) {


  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onPress(note)}
      style={{
        flex: 1,
        margin: 6,
        minHeight: 170,
        borderRadius: 20,
        padding: 16,
        backgroundColor: note.color,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 3,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            fontSize: 15,
            fontWeight: '700',
            color: '#111',
            flex: 1,
          }}
        >
          {note.title}
        </Text>

        {note.is_pinned && (
          <MaterialIcons
            name="push-pin"
            size={16}
            color="#888"
          />
        )}
      </View>

      <Text
        numberOfLines={6}
        style={{
          color: '#555',
          fontSize: 14,
          lineHeight: 20,
        }}
      >
        {note.content}
      </Text>
    </TouchableOpacity>
  );
}

function EmptyState() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
      }}
    >
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: '#EEF2FF',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <MaterialIcons name="description" size={40} color="#6366F1" />
      </View>

      <Text
        style={{
          fontSize: 20,
          fontWeight: '700',
          color: '#111',
        }}
      >
        Nenhuma nota ainda
      </Text>

      <Text
        style={{
          marginTop: 8,
          textAlign: 'center',
          color: '#777',
        }}
      >
        Crie sua primeira nota tocando no botão +
      </Text>
    </View>
  );
}

function renderNote(
  onPress: (note: Note) => void,
): ListRenderItem<Note> {
  return ({ item }) => (
    <NoteCard
      note={item}
      onPress={onPress}
    />
  );
}

export default function NotesScreen() {
  const { createNote, getAllNotes, updateNote } = useNote();
  const theme = DEFAULT_THEME;
  const themeNotes = THEMES.CyberElegancy;
  const NOTE_COLORS = [
    themeNotes.colors.surfaceContainerLow,
    themeNotes.colors.surfaceContainer,
    themeNotes.colors.surfaceContainerHigh,
    themeNotes.colors.surfaceContainerHighest,
    themeNotes.colors.card,
    themeNotes.colors.primaryContainer,
  ];
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [selectedColor, setSelectedColor] = useState(NOTE_COLORS[0]);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const slideAnim = useRef(new Animated.Value(-300)).current;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const loadNotes = async () => {
    try {
      const result = await getAllNotes();

      // @ts-ignore
      setNotes(result || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    if (drawerOpen) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -300,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),
      ]).start(() => {
        slideAnim.setValue(-300);
        fadeAnim.setValue(0);
      });
    }
  }, [drawerOpen]);

  const drawerItems = [
    { icon: 'home', label: 'Início', action: () => {} },
    { icon: 'note', label: 'Minhas Notas', action: () => {} },
    { icon: 'folder', label: 'Categorias', action: () => {} },
    { icon: 'star', label: 'Favoritos', action: () => {} },
    { icon: 'archive', label: 'Arquivo', action: () => {} },
    { icon: 'delete', label: 'Lixeira', action: () => {} },
    { icon: 'settings', label: 'Configurações', action: () => {} },
    { icon: 'info', label: 'Sobre', action: () => {} },
  ];

  const handleDrawerAction = (action: () => void) => {
    action();
    setDrawerOpen(false);
  };

  const filteredNotes = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = !query
      ? notes
      : notes.filter(
          note =>
            (note.title ?? '').toLowerCase().includes(query) ||
            (note.content ?? '').toLowerCase().includes(query),
        );

    return filtered.sort((a, b) => {
      if (a.is_pinned && !b.is_pinned) {
        return -1;
      }

      if (!a.is_pinned && b.is_pinned) {
        return 1;
      }

      return 0;
    });
  }, [notes, search]);

  const openCreateModal = () => {
    setEditingNote(null);
    setTitle('');
    setContent('');
    setSelectedColor(NOTE_COLORS[0]);
    setModalVisible(true);
  };

  const openEditModal = (note: Note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
    setSelectedColor(note.color);
    setModalVisible(true);
  };

  const saveNote = async () => {
    try {
      if (!title.trim() && !content.trim()) {
        return;
      }

      if (editingNote) {
        await updateNote(editingNote.id, {
          title: title.trim(),
          content: content.trim(),
          color: selectedColor,
        });
      } else {
        await createNote({
          title: title.trim() || 'Sem título',
          content: content.trim(),
          color: selectedColor,
        });
      }

      await loadNotes();

      setEditingNote(null);
      setTitle('');
      setContent('');
      setSelectedColor(NOTE_COLORS[0]);

      setModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      {/* HEADER */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: theme.colors.surfaceContainerLow,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.outlineVariant,
        }}
      >
        <View
          style={{
            height: 48,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: theme.colors.outlineVariant,
            backgroundColor: theme.colors.surfaceContainer,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 14,
          }}
        >
          <MaterialIcons
            name="search"
            size={20}
            color={theme.colors.onSurfaceVariant}
          />

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Buscar notas..."
            placeholderTextColor={theme.colors.outline}
            style={{
              flex: 1,
              marginLeft: 10,
              color: theme.colors.onSurface,
              fontSize: 14,
            }}
          />

          {search.length > 0 && (
            <Pressable
              onPress={() => setSearch('')}
              style={({ pressed }) => ({
                padding: 6,
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <MaterialIcons
                name="close"
                size={18}
                color={theme.colors.onSurfaceVariant}
              />
            </Pressable>
          )}
        </View>
      </View>

      {/* LISTA */}
      {filteredNotes.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 32,
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: theme.colors.surfaceContainer,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <MaterialIcons
              name="description"
              size={40}
              color={theme.colors.primary}
            />
          </View>

          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: theme.colors.onSurface,
            }}
          >
            Nenhuma nota ainda
          </Text>

          <Text
            style={{
              marginTop: 8,
              textAlign: 'center',
              color: theme.colors.onSurfaceVariant,
            }}
          >
            Crie sua primeira nota tocando no botão +
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredNotes}
          renderItem={renderNote(openEditModal)}
          keyExtractor={(item, index) =>
            item.id?.toString() ?? index.toString()
          }
          numColumns={2}
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingBottom: 120,
          }}
        />
      )}

      {/* FAB */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={openCreateModal}
        style={{
          position: 'absolute',
          bottom: 30,
          right: 20,
          width: 62,
          height: 62,
          borderRadius: 31,
          backgroundColor: theme.colors.primaryContainer,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: theme.colors.primary,
        }}
      >
        <MaterialIcons
          name="add"
          size={30}
          color={theme.colors.onPrimaryContainer}
        />
      </TouchableOpacity>

      {/* MODAL */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(false);
          setEditingNote(null);
          setTitle('');
          setContent('');
          setSelectedColor(NOTE_COLORS[0]);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.65)',
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.surfaceContainerHigh,
              borderTopLeftRadius: 32,
              borderTopRightRadius: 32,
              padding: 24,
              borderTopWidth: 1,
              borderColor: theme.colors.outlineVariant,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '700',
                  color: theme.colors.onSurface,
                }}
              >
                {editingNote ? 'Editar Nota' : 'Nova Nota'}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  setEditingNote(null);
                  setTitle('');
                  setContent('');
                  setSelectedColor(NOTE_COLORS[0]);
                }}
              >
                <MaterialIcons
                  name="close"
                  size={24}
                  color={theme.colors.onSurface}
                />
              </TouchableOpacity>
            </View>

            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Título"
              placeholderTextColor={theme.colors.outline}
              style={{
                fontSize: 20,
                fontWeight: '600',
                color: theme.colors.onSurface,
                marginBottom: 16,
              }}
            />

            <TextInput
              value={content}
              onChangeText={setContent}
              multiline
              placeholder="O que você está pensando?"
              placeholderTextColor={theme.colors.outline}
              style={{
                minHeight: 180,
                textAlignVertical: 'top',
                fontSize: 16,
                color: theme.colors.onSurface,
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginTop: 20,
                marginBottom: 24,
              }}
            >
              {NOTE_COLORS.map(color => (
                <TouchableOpacity
                  key={color}
                  onPress={() => setSelectedColor(color)}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 17,
                    backgroundColor: color,
                    marginRight: 12,
                    marginBottom: 12,
                    borderWidth: selectedColor === color ? 2 : 0,
                    borderColor:
                      selectedColor === color
                        ? theme.colors.primary
                        : 'transparent',
                  }}
                />
              ))}
            </View>

            <TouchableOpacity
              onPress={saveNote}
              style={{
                backgroundColor: theme.colors.primaryContainer,
                height: 54,
                borderRadius: 27,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: theme.colors.onPrimaryContainer,
                  fontWeight: '700',
                  fontSize: 16,
                }}
              >
                Salvar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}