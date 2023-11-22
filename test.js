const EM_IP="192.168.1.102";
const R2_IP="192.168.1.108";
const ITK_PORT=8443;

// Resource
const d_resource="/Dropoff"

// url: End Point 
const EM_url=`https://${EM_IP}:${ITK_PORT}${d_resource}`

const dropoff_body={
    "robot": "Sim108",
    "goal": "Goal1",
    "priority": 10,
    "jobId": "test"
}

// 사용자 이름과 비밀번호
const username = "toolkitadmin";
const password = "O0K5WWqh2c6eCEntaLMac";

// Basic Authentication 헤더 생성
const basicAuthHeader = 'Basic ' + btoa(username + ':' + password);

// 자체 서명된 인증서를 허용하도록 설정 (node.js 방식)
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

console.log("Requesting URL:", EM_url);

function Dropoff(){
  fetch(EM_url,{
    method: "POST",
    credentials: 'include',
    mode: 'cors',
    //mode: 'no-cors',  // CORS 문제 해결을 위해 추가
    // agent: new (require('https')).Agent({ rejectUnauthorized: false }),
    headers:{
      "accept": "application/json; charset=utf-8",
      "Content-Type":"application/json; charset=utf-8",
      "Authorization": basicAuthHeader, 
    },
    // JSON Body
    body: JSON.stringify(dropoff_body),
    })
    // 응답 처리 1단계: Promise 함수 fulfilled, rejected 상태 판단
    .then((response)=>{
      console.log(response);
      if(response.ok){
        return response.json();
      }
      throw new Error("네트워크 통신 오류입니다.");
    })
    // 응답 처리 2단계: body 본문 취득 
    .then((result)=>console.log(result))
    .catch((error)=>console.log("error: ",error));
}

document.querySelector('div').addEventListener('click',Dropoff());
