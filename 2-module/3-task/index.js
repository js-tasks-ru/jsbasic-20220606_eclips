let calculator = {
  memory : [],
  read(a,b) {
    this.memory = [];
    this.memory.push(a);
    this.memory.push(b);
  },
  sum() {
    return this.memory.reduce((a, b) => a + b);
  },
  mul() {
    return this.memory.reduce((a, b) => a * b);
  },
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
