const InputKomponent = ({ setName }) => {
  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      <label htmlFor="name">Wpisz swoje imię: </label>
      <input
        type="text"
        id="name"
        placeholder="Twoje imię"
        onChange={handleChange}
      />
    </div>
  );
};

