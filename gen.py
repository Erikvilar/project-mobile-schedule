#!/usr/bin/env python3
"""
Gerador de Arquivos React Native
Uso: python gen.py repository UserRepository
     python gen.py screen HomeScreen
     python gen.py service AuthService
"""

import sys
import os
from pathlib import Path

def create_repository(name):
    """Cria um arquivo Repository"""
    path = Path(f"src/database/repository/{name}.ts")
    path.parent.mkdir(parents=True, exist_ok=True)
    
    content = f"""import {{ Database }} from '@nozbe/watermelondb';

interface I{name} {{
  // TODO: Adicionar propriedades
}}

export class {name} {{
  private database: Database;

  constructor(database: Database) {{
    this.database = database;
  }}

  public async getAll(): Promise<any[]> {{
    // TODO: Implementar
    return [];
  }}

  private async _privateMethod(): Promise<void> {{
    // TODO: Implementar
  }}
}}
"""
    path.write_text(content)
    print(f"✅ Repository criado: {path}")

def create_screen(name):
    """Cria um arquivo Screen"""
    path = Path(f"src/screens/{name}.tsx")
    path.parent.mkdir(parents=True, exist_ok=True)
    
    content = f"""import React, {{ FC }} from 'react';
import {{ View, Text, StyleSheet }} from 'react-native';

const {name}: FC = () => {{
  return (
    <View>
      <Text >{name}</Text>
      {{/* TODO: Adicionar conteúdo */}}
    </View>
  );
}};


export default {name};
"""
    path.write_text(content)
    print(f"✅ Screen criada: {path}")

def create_service(name):
    """Cria um arquivo Service"""
    path = Path(f"src/services/{name}.ts")
    path.parent.mkdir(parents=True, exist_ok=True)
    
    content = f"""class {name} {{
  public async initialize(): Promise<void> {{
    // TODO: Implementar inicialização
  }}

  public async execute(): Promise<any> {{
    // TODO: Implementar lógica principal
  }}

  private async _privateMethod(): Promise<void> {{
    // TODO: Implementar
  }}
}}

export default new {name}();
"""
    path.write_text(content)
    print(f"✅ Service criado: {path}")

def create_hook(name):
    """Cria um arquivo Hook"""
    path = Path(f"src/hooks/{name}.ts")
    path.parent.mkdir(parents=True, exist_ok=True)
    
    content = f"""import {{ useState, useCallback, useEffect }} from 'react';

export const {name} = () => {{
  const [state, setState] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {{
    setLoading(true);
    setError(null);
    try {{
      // TODO: Implementar lógica
    }} catch (err) {{
      setError(err as Error);
    }} finally {{
      setLoading(false);
    }}
  }}, []);

  useEffect(() => {{
    // TODO: Adicionar efeitos colaterais
  }}, []);

  return {{ state, loading, error, execute }};
}};
"""
    path.write_text(content)
    print(f"✅ Hook criado: {path}")

def create_util(name):
    """Cria um arquivo Utility"""
    path = Path(f"src/utils/{name}.ts")
    path.parent.mkdir(parents=True, exist_ok=True)
    
    content = f"""export const exampleFunction = (param: any): any => {{
  // TODO: Implementar
  return null;
}};

export const anotherFunction = (): void => {{
  // TODO: Implementar
}};
"""
    path.write_text(content)
    print(f"✅ Utility criada: {path}")

def main():
    if len(sys.argv) < 3:
        print("""
Uso: python gen.py <tipo> <nome>

Tipos disponíveis:
  repository    - Criar um Repository
  screen        - Criar uma Screen
  service       - Criar um Service
  hook          - Criar um Hook
  util          - Criar uma Utility

Exemplos:
  python gen.py repository UserRepository
  python gen.py screen HomeScreen
  python gen.py service AuthService
  python gen.py hook useUser
  python gen.py util formatters
        """)
        sys.exit(1)

    tipo = sys.argv[1].lower()
    nome = sys.argv[2]
    
    # Remove extensão se o usuário passou
    nome = nome.replace('.ts', '').replace('.tsx', '')

    if tipo == 'repository':
        create_repository(nome)
    elif tipo == 'screen':
        create_screen(nome)
    elif tipo == 'service':
        create_service(nome)
    elif tipo == 'hook':
        create_hook(nome)
    elif tipo == 'util':
        create_util(nome)
    else:
        print(f"❌ Tipo desconhecido: {tipo}")
        sys.exit(1)

if __name__ == '__main__':
    main()
