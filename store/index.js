let clickCount = 0
let even = false
let cardFirst = 0
let cardFirstFull = 0

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
  openCard(state, { roomId, src, num, opened }) {
    // console.log(num)
    clickCount++
    if (clickCount % 2 === 0) {
      even = true
      setTimeout(() => {
        src = '../assets/z01.gif'
        console.log('裏返す')
      }, 500)
    } else {
      even = false
    }
    console.log('固定番号', num)
    state.rooms = state.rooms.map((room, i) => {
      if (i === roomId) {
        let cardNum = num
        if (cardNum <= 13) {
          // cardNum
        } else if (cardNum >= 14 && cardNum <= 26) {
          cardNum = cardNum % 13
        } else if (cardNum >= 27 && cardNum <= 39) {
          cardNum = cardNum % 26
        } else if (cardNum >= 40 && cardNum <= 52) {
          cardNum = cardNum % 39
        }
        console.log('１から１３まで', cardNum)
        // console.log(typeof (cardNum))
        if (even === false) {
          cardFirst = cardNum
          cardFirstFull = num
        }
        if (even === true) {
          if (cardFirst === cardNum) {
            if (cardFirstFull !== num) {
            // room.cards[cardNum - 1].isShow = 'none'
            // room.cards[cardFirst - 1].isShow = 'none'
              // console.log(cardFirstFull + 0)
              console.log('当たり！ここで２枚を削除する')

            // console.log(cardFirstFull)
            // room.cards[room.cards[cardFirstFull].num - 1].isShow = 'none'
            // console.log(cardFirstFull)
            // console.log(room.cards)
            // console.log(room.cards[cardNum])
            // console.log(room.cards[cardNum] = 0)
            } else {
              console.log('同じカードは選べません')
            }
          }
        }
        return {
          cards: room.cards.map((card) => {
            if (even === true) {
              // setTimeout(() => {
              //   // return { ...card, src: '../assets/z01.gif' }
              //   console.log('裏返す')
              //   return { ...card, src: '../assets/z01.gif', opened: false }
              // }, 500)
            }
            return card.src === src ? { ...card, opened: true } : card
          })
        }
      } else {
        return room
      }
    })
  }
}
