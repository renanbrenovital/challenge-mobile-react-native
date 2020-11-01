import React, {useEffect, useState} from 'react';
import {Container, Header, Content, Logo} from './styles';
import {FlatList} from 'react-native';
import api from '../../services/api';
import logo from '../../assets/marvel.png';
import Character from '../Character';

type CharactersState = Marvel.Character[] | undefined;

const Characters = () => {
  const [characters, setCharacters] = useState<CharactersState>([]);

  useEffect(() => {
    async function getCharacters(): Promise<CharactersState> {
      const {
        data: {data},
      } = await api.get('/characters');
      return data.results;
    }

    getCharacters()
      .then((results) => {
        setCharacters(results);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Container>
      <Header>
        <Logo source={logo} />
      </Header>
      <Content>
        <FlatList
          data={characters}
          keyExtractor={({name}) => name || ''}
          numColumns={2}
          renderItem={({item}) => <Character data={item} />}
        />
      </Content>
    </Container>
  );
};

export default Characters;
