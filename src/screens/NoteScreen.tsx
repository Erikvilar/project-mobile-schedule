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

const NOTE_COLORS = [
  '#FFFFFF',
  '#FFF9C4',
  '#E8F5E9',
  '#E3F2FD',
  '#F3E5F5',
  '#FFDAD6',
];

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
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* HEADER */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        <View
          style={{
            height: 44,
            borderRadius: 12,
            borderColor: '#e5e7eb',
            borderWidth: 1,
            backgroundColor: '#f9fafb',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
          }}
        >
          <Pressable
            onPress={() => setDrawerOpen(true)}
            style={({ pressed }) => ({
              padding: 8,
              borderRadius: 8,
              backgroundColor: pressed ? '#f3f4f6' : 'transparent',
              marginRight: 8,
            })}
          >
            <MaterialIcons name="menu" size={22} color="#1f2937" />
          </Pressable>

          <MaterialIcons name="search" size={20} color="#9ca3af" />

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Buscar notas..."
            placeholderTextColor="#d1d5db"
            style={{
              flex: 1,
              marginLeft: 10,
              color: '#1f2937',
              fontSize: 14,
              fontWeight: '500',
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
              <MaterialIcons name="close" size={18} color="#9ca3af" />
            </Pressable>
          )}
        </View>
      </View>

      {/* DRAWER */}
      <Modal
        visible={drawerOpen}
        animationType="none"
        transparent
        onRequestClose={() => setDrawerOpen(false)}
      >
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)'],
            }),
          }}
        >
          <Pressable style={{ flex: 1 }} onPress={() => setDrawerOpen(false)}>
            <Animated.View
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '75%',
                backgroundColor: '#fff',
                paddingTop: 24,
                shadowColor: '#000',
                shadowOffset: { width: 2, height: 0 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
                elevation: 8,
                transform: [
                  {
                    translateX: slideAnim,
                  },
                ],
              }}
            >
              <View
                style={{
                  paddingHorizontal: 20,
                  marginBottom: 24,
                }}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: '#3b82f6',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}
                >
                  <MaterialIcons name="note" size={28} color="#fff" />
                </View>

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: 2,
                  }}
                >
                  NotesApp
                </Text>

                <Text
                  style={{
                    fontSize: 13,
                    color: '#9ca3af',
                    fontWeight: '500',
                  }}
                >
                  usuario@email.com
                </Text>
              </View>

              <View
                style={{
                  height: 1,
                  backgroundColor: '#e5e7eb',
                  marginHorizontal: 16,
                  marginBottom: 16,
                }}
              />

              <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
              >
                {drawerItems.map((item, index) => (
                  <Pressable
                    key={index}
                    onPress={() => handleDrawerAction(item.action)}
                    style={({ pressed }) => ({
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      marginHorizontal: 8,
                      borderRadius: 8,
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: pressed ? '#f3f4f6' : 'transparent',
                    })}
                  >
                    <MaterialIcons
                      name={item.icon as any}
                      size={22}
                      color="#6b7280"
                      style={{
                        marginRight: 14,
                      }}
                    />

                    <Text
                      style={{
                        fontSize: 15,
                        color: '#374151',
                        fontWeight: '500',
                      }}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </Animated.View>
          </Pressable>
        </Animated.View>
      </Modal>

      {/* LISTA */}
      {filteredNotes.length === 0 ? (
        <EmptyState />
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
        activeOpacity={0.8}
        onPress={openCreateModal}
        style={{
          position: 'absolute',
          bottom: 30,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#000',
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 8,
        }}
      >
        <MaterialIcons name="add" size={30} color="#FFF" />
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
            backgroundColor: 'rgba(0,0,0,0.25)',
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              backgroundColor: '#FFF',
              borderTopLeftRadius: 32,
              borderTopRightRadius: 32,
              padding: 24,
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
                <MaterialIcons name="close" size={24} />
              </TouchableOpacity>
            </View>

            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Título"
              style={{
                fontSize: 20,
                fontWeight: '600',
                marginBottom: 16,
              }}
            />

            <TextInput
              value={content}
              onChangeText={setContent}
              multiline
              placeholder="O que você está pensando?"
              style={{
                minHeight: 180,
                textAlignVertical: 'top',
                fontSize: 16,
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
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: color,
                    marginRight: 12,
                    marginBottom: 12,
                    borderWidth: selectedColor === color ? 2 : 0,
                    borderColor: '#000',
                  }}
                />
              ))}
            </View>

            <TouchableOpacity
              onPress={saveNote}
              style={{
                backgroundColor: '#000',
                height: 52,
                borderRadius: 26,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: '#FFF',
                  fontWeight: '600',
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