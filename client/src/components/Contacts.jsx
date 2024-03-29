import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logout from "./Logout";

export default function Contacts({ contacts, changeChat, socket , onlineUsers}) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);


  const setOnlineColor = (id) => {
      return onlineUsers.includes(id) ? '#7eedb2' : 'red';
  };


  useEffect(() => {
    async function fetchData() {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      if(!data) return;
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    }
    fetchData();
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <h3>ChatApp</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="point" style={{ backgroundColor: setOnlineColor(contact._id) }}></div>
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username"><h3>{contact.username}</h3></div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
            <div className="logout">
              <Logout socket={socket} />
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: auto;
    &::-webkit-scrollbar {
      height: 2px;
      &-thumb {
        background-color: #ffffff39;
      }
    }
  background-color: #FC6736;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      min-width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .point{
        border-radius: 50%;
        height: 0.5rem;
        width: 0.5rem;
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #FFB0B0;
    }
    @media screen and (min-width: 480px) and (max-width: 900px) {
      .contact {
        min-height: 3rem;
        .avatar {
          img {
            height: 2rem;
          }
        }
        .username {
          h3 {
            font-size: 1rem;
          }
        }
      }
    }
  }

  .current-user {
    background-color: #FC6736;
    border : 2px solid #ffffff34;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 3rem;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    .logout {
      background-color: #FFB0B0;
      border-radius: 0.5rem;
    }
    @media screen and (min-width: 480px) and (max-width: 900px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
      .avatar {
          img {
            height: 2rem;
          }
      }
    }
  }
`;