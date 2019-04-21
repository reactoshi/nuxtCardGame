let clickCount = 0
let even = false
let cardFirst = 0

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
    clickCount++
    if (clickCount % 2 === 0) {
      even = true
    } else {
      even = false
    }
    console.log(even)
    state.rooms = state.rooms.map((room, i) => {
      if (i === roomId) {
        let cardNum = parseInt(src.replace(/[^0-9]/g, '')) // ここでparseIntしないとStringになってしまう
        if (cardNum <= 13) {
          // cardNum
        } else if (cardNum >= 14 && cardNum <= 26) {
          cardNum = cardNum % 13
        } else if (cardNum >= 27 && cardNum <= 39) {
          cardNum = cardNum % 26
        } else if (cardNum >= 40 && cardNum <= 52) {
          cardNum = cardNum % 39
        }
        console.log(typeof (cardNum))
        if (even === false) {
          cardFirst = cardNum
        } else if (even === true) {
          if (cardFirst === cardNum) {
            console.log('great!!')
          }
        }
        return {
          cards: room.cards.map((card) => {
            return card.src === src ? { ...card, opened: true } : card
          })
        }
      } else {
        return room
      }
    })
  }
}
