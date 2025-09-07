import styled, { keyframes } from "styled-components";
import { useState } from "react";
import { useGetCurrentUser } from "../service/reactQuery/reactQuery";

// Анімації
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(74, 144, 226, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(74, 144, 226, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(74, 144, 226, 0);
  }
`;

// Стилізовані компоненти (Mobile First)
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 16px;
  animation: ${fadeIn} 0.8s ease-out;
  width: 100%;

  @media (min-width: 768px) {
    padding: 24px;
  }

  @media (min-width: 1024px) {
    padding: 32px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;

  @media (min-width: 768px) {
    max-width: 800px;
  }

  @media (min-width: 1024px) {
    max-width: 1200px;
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 32px;
  animation: ${slideInLeft} 0.6s ease-out;

  @media (min-width: 768px) {
    margin-bottom: 40px;
  }

  @media (min-width: 1024px) {
    margin-bottom: 48px;
  }
`;

const PageTitle = styled.h1`
  color: white;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  @media (min-width: 768px) {
    font-size: 36px;
  }

  @media (min-width: 1024px) {
    font-size: 42px;
  }
`;

const PageSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  font-weight: 400;

  @media (min-width: 768px) {
    font-size: 18px;
  }

  @media (min-width: 1024px) {
    font-size: 20px;
  }
`;

const MainContent = styled.main`
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    gap: 32px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
`;

const ProfileCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 28px;
  animation: ${slideInLeft} 0.8s ease-out 0.2s both;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    padding: 36px;
  }

  @media (min-width: 1024px) {
    padding: 40px;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
      transition: all 0.3s ease;
    }
  }
`;

const InfoCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 28px;
  animation: ${slideInRight} 0.8s ease-out 0.4s both;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    padding: 36px;
  }

  @media (min-width: 1024px) {
    padding: 40px;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
      transition: all 0.3s ease;
    }
  }
`;

const AvatarSection = styled.div`
  text-align: center;
  margin-bottom: 32px;

  @media (min-width: 768px) {
    margin-bottom: 40px;
  }
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: bold;
  color: white;
  margin: 0 auto 20px auto;
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  animation: ${pulse} 2s infinite;

  @media (min-width: 768px) {
    width: 140px;
    height: 140px;
    font-size: 56px;
  }

  @media (min-width: 1024px) {
    width: 160px;
    height: 160px;
    font-size: 64px;
  }
`;

const UserName = styled.h2`
  color: white;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  @media (min-width: 768px) {
    font-size: 28px;
  }

  @media (min-width: 1024px) {
    font-size: 32px;
  }
`;

const UserRole = styled.div`
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (min-width: 768px) {
    padding: 10px 20px;
    font-size: 16px;
  }
`;

const CardTitle = styled.h3`
  color: white;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;

  &::before {
    content: "";
    width: 4px;
    height: 24px;
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    border-radius: 2px;
  }

  @media (min-width: 768px) {
    font-size: 26px;
    margin-bottom: 28px;
  }

  @media (min-width: 1024px) {
    font-size: 28px;
    margin-bottom: 32px;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    gap: 24px;
  }
`;

const InfoItem = styled.div`
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  border-left: 4px solid rgba(79, 172, 254, 0.6);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateX(4px);
  }

  @media (min-width: 768px) {
    padding: 24px;
  }
`;

const InfoLabel = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;

  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

const InfoValue = styled.div`
  color: white;
  font-size: 16px;
  font-weight: 500;
  word-break: break-word;

  @media (min-width: 768px) {
    font-size: 18px;
  }

  @media (min-width: 1024px) {
    font-size: 20px;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 32px;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    margin-top: 40px;
  }
`;

const Button = styled.button`
  padding: 14px 24px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;

  &.primary {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
    box-shadow: 0 4px 16px rgba(79, 172, 254, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(79, 172, 254, 0.4);
    }
  }

  &.secondary {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);

    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }
  }

  @media (min-width: 768px) {
    padding: 16px 28px;
    font-size: 18px;
  }
`;

const UserProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const getInitials = (name, lastName) => {
    const firstInitial = name ? name.charAt(0).toUpperCase() : "";
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
    return firstInitial + lastInitial;
  };

  const { data } = useGetCurrentUser();
  const currentUser = data?.data || null;
  console.log("Current User:", currentUser);

  const formatRole = (role) => {
    const roleMap = {
      admin: "Адміністратор",
      manager: "Менеджер",
      user: "Користувач",
      developer: "Розробник",
      designer: "Дизайнер",
    };
    return roleMap[role?.toLowerCase()] || role || "Користувач";
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Тут можна додати логіку збереження
    console.log("Збереження змін...");
  };

  return (
    <>
      <PageContainer>
        <ContentWrapper>
          <Header>
            <PageTitle>Профіль користувача</PageTitle>
            <PageSubtitle>Детальна інформація про обліковий запис</PageSubtitle>
          </Header>

          <MainContent>
            <ProfileCard>
              <AvatarSection>
                <Avatar>
                  {getInitials(currentUser.name, currentUser.lastName)}
                </Avatar>
                <UserName>
                  {currentUser.name} {currentUser.lastName}
                </UserName>
                <UserRole>{formatRole(currentUser.role)}</UserRole>
              </AvatarSection>

              <ActionButtons>
                <Button
                  className="primary"
                  onClick={isEditing ? handleSave : handleEdit}
                >
                  {isEditing ? "Зберегти зміни" : "Редагувати профіль"}
                </Button>
                <Button className="secondary">Змінити пароль</Button>
              </ActionButtons>
            </ProfileCard>

            <InfoCard>
              <CardTitle>Інформація про користувача</CardTitle>

              <InfoGrid>
                <InfoItem>
                  <InfoLabel>Ідентифікатор</InfoLabel>
                  <InfoValue>{currentUser._id}</InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>Ім'я</InfoLabel>
                  <InfoValue>{currentUser.name}</InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>Прізвище</InfoLabel>
                  <InfoValue>{currentUser.lastName}</InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>Email адреса</InfoLabel>
                  <InfoValue>{currentUser.email}</InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>Роль в системі</InfoLabel>
                  <InfoValue>{formatRole(currentUser.role)}</InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>Відділ</InfoLabel>
                  <InfoValue>
                    {currentUser.department || "Не вказано"}
                  </InfoValue>
                </InfoItem>
              </InfoGrid>
            </InfoCard>
          </MainContent>
        </ContentWrapper>
      </PageContainer>
    </>
  );
};

export default UserProfilePage;
