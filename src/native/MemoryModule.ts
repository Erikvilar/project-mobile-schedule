import { NativeModules } from 'react-native';

interface MemoryModuleType {
    releaseMemory(): void;
}

export default NativeModules.MemoryModule as MemoryModuleType;