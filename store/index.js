export const state = () => ({
  rooms: JSON.parse(localStorage.trump_data || '[]')
})

export const plugins = [
  (store) => {
    store.subscribe(() => {
      localStorage.trump_data = JSON.stringify(store.state.rooms)
    })
  }
]

export const mutations = {
  addRoom(state, room) {
    state.rooms = [...state.rooms, room]
  },
  openCard(state, { roomId, src }) {
    state.rooms = state.rooms.map((room, i) => {
      if (i === roomId) {
        let cardNum = src.replace(/[^0-9]/g, '')
        if (cardNum <= 13) {
          // cardNum
        } else if (cardNum >= 14 && cardNum <= 26) {
          cardNum = cardNum % 13
        } else if (cardNum >= 27 && cardNum <= 39) {
          cardNum = cardNum % 26
        } else if (cardNum >= 40 && cardNum <= 52) {
          cardNum = cardNum % 39
        }
        console.log(cardNum)
        return {
          cards: room.cards.map((card) => {
            return card.src === src
              ? { ...card, opened: true } : card
          })
        }
      } else {
        return room
      }
    })
  }
}
