import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import useUsers from '@/hooks/useUsers';
import { DEFAULT_THEME } from '@/theme/constants';

const theme = DEFAULT_THEME;
const { width } = Dimensions.get('window');

const now = new Date();
const isDayTime = now.getHours() >= 6 && now.getHours() < 18;

const getGreeting = (hour: number): string => {
  if (hour >= 6 && hour < 12) return 'Bom dia';
  if (hour >= 12 && hour < 18) return 'Boa tarde';
  return 'Boa noite';
};

const getHourFormatted = (): string => {
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

const CardWelcome = () => {
  const { user } = useUsers();

  const dateText = now.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });

  const formattedDate = dateText.charAt(0).toUpperCase() + dateText.slice(1);
  const greeting = getGreeting(now.getHours());
  const hourFormatted = getHourFormatted();

  const iconName = isDayTime ? 'sunny' : 'moon';
  const iconColor = isDayTime ? theme.colors.secondary : theme.colors.primary;
  const greetingColor = isDayTime
    ? theme.colors.secondary
    : theme.colors.primary;

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.surfaceContainerLow,
            borderColor: theme.colors.outline,
          },
        ]}
      >
        {/* Linha decorativa lateral */}
        <View
          style={[
            styles.leftAccent,
            {
              backgroundColor: greetingColor,
            },
          ]}
        />

        {/* Conteúdo Principal */}
        <View style={styles.contentWrapper}>
          {/* Saudação e Hora */}
          <View style={styles.headerRow}>
            <View style={styles.greetingContainer}>
              <Text
                style={[
                  styles.greeting,
                  {
                    color: greetingColor,
                  },
                ]}
              >
                {greeting}
              </Text>
            </View>
            <Text
              style={[
                styles.time,
                {
                  color: theme.colors.onSurfaceVariant,
                },
              ]}
            >
              {hourFormatted}
            </Text>
          </View>

          {/* Usuário */}
          <Text
            style={[
              styles.title,
              {
                color: theme.colors.onSurface,
              },
            ]}
            numberOfLines={1}
          >
            {user}
          </Text>

          {/* Data */}
          <View style={styles.dateContainer}>
            <Icon
              name="calendar-outline"
              size={13}
              color={theme.colors.onSurfaceVariant}
              style={{ marginRight: 6 }}
            />
            <Text
              style={[
                styles.subtitle,
                {
                  color: theme.colors.onSurfaceVariant,
                },
              ]}
            >
              {formattedDate}
            </Text>
          </View>
        </View>

        {/* Ícone Decorativo */}
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: theme.colors.surfaceContainer,
              borderColor: theme.colors.outline,
            },
          ]}
        >
          <View style={styles.iconInnerContainer}>
            <Icon name={iconName} size={26} color={iconColor} />
          </View>
        </View>
      </View>

      {/* Indicador decorativo */}
      <View style={styles.indicatorContainer}>
        {[0, 1, 2].map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              {
                backgroundColor:
                  index === 0 ? greetingColor : theme.colors.surfaceContainer,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 18,

    borderWidth: 1,
    borderRadius: 18,

    overflow: 'hidden',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 5,
  },

  leftAccent: {
    width: 4,
    height: '100%',
    borderRadius: 2,
    marginRight: 12,
    marginHorizontal: -16,
    marginVertical: -18,
  },

  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    gap: 6,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },

  greetingContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },

  greeting: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },

  time: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.3,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginVertical: 2,
  },

  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },

  subtitle: {
    fontSize: 13,
    fontWeight: '400',
    textTransform: 'capitalize',
    letterSpacing: 0.2,
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,

    borderWidth: 1.5,

    alignItems: 'center',
    justifyContent: 'center',

    marginLeft: 12,

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },

  iconInnerContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  indicatorContainer: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 4,
  },

  indicator: {
    height: 3,
    flex: 1,
    borderRadius: 1.5,
  },
});

export default CardWelcome;
