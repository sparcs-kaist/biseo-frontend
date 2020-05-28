import React, { useState, useEffect, useRef } from 'react';
import './Chatbox.css'

function Chatbox(props) {
  // chatting_height = "50%" // 채팅방 크기 (전체 html 태그 기준 * 70% * 현재 퍼센트가 채팅방 높이가 됨)
  const chattings = useRef(null)
  const [prev_time] = useState([0,0,0,0,0,0])
  const set_prev_time = (new_one) => {
    for(let i = 0; i < 6; i++){
      prev_time[i] = new_one[i]
    }
  }
  const _check= (d) => { // check 함수는 도배 방지용으로 0.1초 안에 보낸 메시지가 있으면 자동으로 block 시킴 -> Mac 키보드 오류도 방지함
    let time =[d.getYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(),d.getMilliseconds()]
    const interval = 100
    for(let i = 0; i < 6 ; i++){
      if(time[i]>prev_time[i]){
        console.log("a")
        set_prev_time(time)
        return true
      }
    }
    if(time[6]>prev_time[6]+interval){
      console.log("b")
      set_prev_time(time)
      return true
    }
    console.log("blocked")
    return false
  }

  const _send_click = () => { // click 버튼 들어오면 chat message 로 socket에 메시지 보냄
    let d = new Date();
    if(_check(d)){ // 도배 방지 체크
      const message = document.getElementById("message").value

      props.socket.emit('chat message',message)
      const li = document.createElement('li')
      li.className = "mine"
      li.innerText = "Me: " + message
      document.getElementById("message").value = ""
      chattings.current.appendChild(li)
      chattings.current.scrollTop = chattings.current.scrollHeight // 채팅 스크롤 맨 아래로 유지


    }
  }

  const _send_enter = (event) => { // enter 버튼 들어오면 chat message 로 socket에 메시지 보냄
    if (event.keyCode === 13) {
      let d = new Date();

      if(_check(d)){ // 도배 방지 체크
        event.preventDefault();
        const message = document.getElementById("message").value
        props.socket.emit('chat message',message)
        const li = document.createElement('li')
        li.className = "mine"
        li.innerText = "Me: " + message
        document.getElementById("message").value = ""
        chattings.current.appendChild(li)

        chattings.current.scrollTop = chattings.current.scrollHeight // 채팅 스크롤 맨 아래로 유지

      }
    }
  };

  const _preprocess = () => {
    // const chatting_height = "50%" // 채팅방 크기 (전체 html 태그 기준 * 70% * 현재 퍼센트가 채팅방 높이가 됨)
    // chattings.style.height = chatting_height

    document.getElementById("message").addEventListener("keyup", _send_enter)
    document.getElementById("send").addEventListener("click", _send_click)
    console.log(chattings.current)
    props.socket.on('members',function(accessor){ // 변경된 members 정보를 socket 으로부터 받아서 div.members에 넣어줌
      console.log(accessor)

      if(document.getElementsByClassName("members")[0].childElementCount !== 0){
        console.log("일단")
        document.getElementsByClassName("members")[0].innerHTML = ""
      }
      for (let i=0 ; i<accessor.length; i++){
        const li = document.createElement('li')
        li.innerText = accessor[i]
        document.getElementsByClassName("members")[0].appendChild(li)
      }
    })

    props.socket.on('chat message',function(user, message){ // chat message를 socket 으로부터 받아서 ul.chatting 에 li child 로 넣어줌
      const li = document.createElement('li')
      li.innerText = user + ": " + message
      li.className = "recieved"
      chattings.current.appendChild(li)

      chattings.current.scrollTop = chattings.current.scrollHeight // 채팅 스크롤 맨 아래로 유지

    })

    props.socket.on('enter',function(username){ // 새로운 유저가 들어왔다는 것을 socket으로부터 받아서 ul.chatting 에 보어줌

      const li = document.createElement('li')
      li.className = "enter"
      li.innerText = username + " is entered"
      console.log("user add")
      chattings.current.appendChild(li)

      chattings.current.scrollTop = chattings.current.scrollHeight // 채팅 스크롤 맨 아래로 유지

    })

    props.socket.on('out',function(username){ // 유저가 나갔다는 것을 socket으로부터 받아서 ul.chatting 에 보어줌

      const li = document.createElement('li')
      li.className = "enter"
      li.innerText = username + " left the room"
      console.log("user left")
      chattings.current.appendChild(li)

      chattings.current.scrollTop = chattings.current.scrollHeight // 채팅 스크롤 맨 아래로 유지

    })

    props.socket.on('name',function(name){ // 로그인이 없는 상태이므로 접속하면 랜덤 유저이름을 socket에서 보내주고 그걸 받아서 보여줌
      document.getElementById("username").innerText = "Your name is " + name
    })
  }


  useEffect(()=>{
    _preprocess()
  }, [])

  return (
    <div className="content">
      <div className="aside">
        <ul className="members">
        </ul>
      </div>
      <div className="display">
        <ul className="chatting" ref={chattings}></ul>
        <input type="text" id="message"/>
        <button id="send">Send</button>
        <button id="below">아래로</button>
      </div>
    </div>
  )

}

export default Chatbox
