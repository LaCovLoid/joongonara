import { defineStore } from 'pinia';

export const piniaStore = defineStore('storeId', {
  state: () => {
    return {
      count: 0,
      history: ["","",""],
    }
  },
  actions: {
    setCount(value: number){
      this.count = value;
    },

    addHistory(value: string){
      const empty: boolean = this.history[this.history.length - 1] == "";
      const overlap: boolean = this.history.includes(value);

      if (isNaN(Number(value)) || Number(value) == -1) return;
      
      //중복이 있는지 확인
      if (overlap) {
        this.history.splice(this.history.indexOf(value), 1);
        if (!empty){
          this.history.push(value);
          return;
        } else {
          this.history.push("");
        }
      }

      //배열에 빈 칸이 있으면 그곳에 입력
      if (empty) {
        for(let i = 0; i < this.history.length; i++) {
          if (this.history[i] == "") {
            this.history[i] = value;
            break;
          }
        }
      } else { //빈 칸이 없으면 가장 오래된거 삭제
        for(let i = 0; i < this.history.length; i++) {
          this.history[i] = this.history[i + 1];
        }
        this.history[this.history.length - 1] = value;
      }
    },

    removeHistory(value: number){
      this.history.splice(value,1);
      this.history.push("");
    }
  },
  getters: {
    getCount(state){
      return state.count;
    },
    getHistory(state){
      return state.history;
    }
  }
});