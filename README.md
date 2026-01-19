# Processo Seletivo SEPLAG-MT 2026
## Cargo: Analista de TI - Perfil Engenheiro da Computação (Sênior)

---

### 👤 Candidato: Jones Carlos Viegas
**Especialista em Segurança Cibernética | Business Intelligence | Análise de Sistemas**

*   🌐 [Portfólio Profissional](https://jonesviegas.github.io/portiflio_jones/)
*   💼 [LinkedIn](www.linkedin.com/in/jones-viegas-217767263/)


---

### 🏗️ Arquitetura do Sistema
Desenvolvido como uma solução Full Stack moderna, o projeto foca em alta segurança, escalabilidade e conformidade com os requisitos de senioridade do edital SEPLAG-MT.

*   **Backend:** Java 17, Spring Boot 3.4, Spring Security (JWT), Spring Data JPA.
*   **Frontend:** React 18, TypeScript, Tailwind CSS (Design Responsivo).
*   **Infraestrutura:** Docker Compose gerenciando PostgreSQL 15 e MinIO (Storage S3).
*   **Integrações:** Sincronização automática com a API Argus (Regionais) com lógica de versionamento.

### ✅ Requisitos Implementados (Checklist do Edital)
- [x] **Segurança:** Autenticação JWT com expiração de 5 minutos (Item 6.3.1-b).
- [x] **Tempo Real:** Notificações via WebSockets (Item 6.3.1-c).
- [x] **Resiliência:** Rate Limiting de 10 req/min por usuário (Item 6.3.1-d).
- [x] **Integração:** Sincronização automática de dados externos (Item 6.3.1-e).
- [x] **Armazenamento:** Upload de arquivos para MinIO/S3 com links pré-assinados de 30min (Item 6.3.1-h/i).
- [x] **Banco de Dados:** Controle de versão via Flyway Migrations (Item 6.3.1-k).
- [x] **Documentação:** API totalmente mapeada via Swagger/OpenAPI (Item 6.3.1-l).
- [x] **Testes:** Implementação de testes unitários básicos.

### 🚀 Como Rodar o Projeto
1. Na raiz: `docker-compose up -d`
2. Na pasta `/backend`: `./mvnw spring-boot:run`
3. Na pasta `/frontend`: `npm install` e `npm run dev`
4. Credenciais: `admin` / `admin123`