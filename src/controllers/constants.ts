const index = {
  text: 'Hello World',
};

const about = {
  mainText: 'Seja bem-vindo ao Space Shooter!',
  helperText:
    'Este jogo foi desenvolvido na disciplina de Programação para Web do curso de Engenharia de Software da Universidade Federal do Amazonas!',
  aboutMe:
    'Me chamo Bianka, responsável pelo desenvolvimento deste trabalho. Sou do curso de Ciência da Computação e atualmente sou finalista, prestes a me formar =D',
};

const university = {
  uf: 'Universidade Federal do Amazonas',
};

const expressInfo = {
  poweredByNodejs: true,
  name: 'Express',
  type: 'Framework',
};

const professorsList = [
  { name: 'David Fernandes', room: 1238 },
  { name: 'Horário Fernandes', room: 1233 },
  { name: 'Edleno Moura', room: 1236 },
  { name: 'Elaine Harada', room: 1231 },
];

const technologiesList = [
  { name: 'Express', type: 'Framework', poweredByNodejs: true },
  { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
  { name: 'React', type: 'Library', poweredByNodejs: true },
  { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
  { name: 'Django', type: 'Framework', poweredByNodejs: false },
  { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
  { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
];

export default {
  index,
  about,
  university,
  expressInfo,
  professorsList,
  technologiesList,
};
