CREATE TABLE User (
  UserId int PRIMARY KEY AUTO_INCREMENT NOT NULL,
  FirstName varchar(100) NOT NULL,
  LastName varchar(100) NOT NULL,
  Email varchar(100) NOT NULL
);

CREATE TABLE Company (
  CompanyId int PRIMARY KEY AUTO_INCREMENT NOT NULL,
  Name varchar(100) NOT NULL
);

CREATE TABLE Job (
  JobId int PRIMARY KEY AUTO_INCREMENT NOT NULL,
  Title varchar(100) NOT NULL
);

CREATE TABLE CompanyMember (
  CompanyMemberId int PRIMARY KEY AUTO_INCREMENT NOT NULL,
  CompanyId int NOT NULL,
  UserId int NOT NULL,
  Role varchar(50) NOT NULL DEFAULT 'recruiter',
  FOREIGN KEY (CompanyId) REFERENCES Company (CompanyId),
  FOREIGN KEY (UserId) REFERENCES User (UserId)
);

CREATE TABLE CompanyJob (
  CompanyId int NOT NULL,
  JobId int NOT NULL,
  CompanyMemberId int NOT NULL,
  Status varchar(50) NOT NULL DEFAULT 'open',
  PRIMARY KEY (CompanyId, JobId),
  FOREIGN KEY (CompanyId) REFERENCES Company (CompanyId),
  FOREIGN KEY (JobId) REFERENCES Job (JobId),
  FOREIGN KEY (CompanyMemberId) REFERENCES CompanyMember (CompanyMemberId)
);

CREATE TABLE JobSeeker (
  JobSeekerId int PRIMARY KEY NOT NULL,
  FOREIGN KEY (JobSeekerId) REFERENCES User (UserId)
);

CREATE TABLE JobSeekerSavedJob (
  JobSeekerId int NOT NULL,
  JobId int NOT NULL,
  PRIMARY KEY (JobSeekerId, JobId),
  FOREIGN KEY (JobSeekerId) REFERENCES User (UserId),
  FOREIGN KEY (JobId) REFERENCES Job (JobId)
);

CREATE TABLE JobApplication (
  -- JobApplicationId int PRIMARY KEY AUTO_INCREMENT NOT NULL,
  JobId int NOT NULL,
  JobSeekerId int NOT NULL,
  PRIMARY KEY (JobId, JobSeekerId),
  FOREIGN KEY (JobSeekerId) REFERENCES User (UserId),
  FOREIGN KEY (JobId) REFERENCES Job (JobId)
);

CREATE TABLE CompanyFollower (
  CompanyId int NOT NULL,
  JobSeekerId int NOT NULL,
  PRIMARY KEY (CompanyId, JobSeekerId),
  FOREIGN KEY (CompanyId) REFERENCES Company (CompanyId),
  FOREIGN KEY (JobSeekerId) REFERENCES User (UserId)
);

INSERT INTO 
  User (FirstName, LastName, Email) 
VALUES 
  ('Nawawish', 'Samerpark', 'nawawishsamerpark@gmail.com'),
  ('Shiwawan', 'Kapremas', 'shiwawankapremas@gmail.com'),
  ('Christopher', 'Robin', 'christopherrobin@gmail.com'),
  ('Vivian', 'Mayer', 'vivianmayer@gmail.com'),
  ('Leonel', 'Messi', 'leonelmessi@gmail.com'),
  ('Tiger', 'Wood', 'tigerwood@gmail.com');

INSERT INTO 
  Company (Name) 
VALUES 
  ('Amazon'), ('Google'), ('Microsoft');

INSERT INTO 
  Job (Title) 
VALUES 
  ('System analyst'), ('Front-end developer'), ('UX designer');

INSERT INTO
  CompanyMember (CompanyId, UserId, Role)
VALUES
  (1, 1, 'administrator'),
  (2, 2, 'recruiter'),
  (3, 3, 'administrator');

INSERT INTO 
  CompanyJob (CompanyId, JobId, CompanyMemberId) 
VALUES 
  (1, 1, 1),
  (2, 2, 2),
  (2, 3, 3);

INSERT INTO JobSeeker (JobSeekerId) VALUES (4), (5), (6);

INSERT INTO JobSeekerSavedJob (JobSeekerId, JobId)
VALUES (4, 1), (4, 2), (5, 2), (6, 1), (6, 2), (6, 3);

INSERT INTO 
  JobApplication (JobId, JobSeekerId)
VALUES
  (1, 1),
  (2, 1),
  (3, 1),
  (1, 2),
  (1, 3),
  (2, 3);

INSERT INTO
  CompanyFollower (CompanyId, JobSeekerId)
VALUES
  (1, 4),
  (1, 5),
  (1, 6),
  (2, 4),
  (2, 5),
  (2, 6),
  (3, 4),
  (3, 5),
  (3, 6);

--
-- Views
--
CREATE VIEW AllJobsView AS
SELECT 
  C.Name AS CompanyName,
  J.Title AS JobTitle,
  P.FirstName AS PosterName,
  CM.Role AS Role
FROM CompanyJob CJ
INNER JOIN Company C ON CJ.CompanyId = C.CompanyId
INNER JOIN Job J ON CJ.JobId = J.JobId
INNER JOIN CompanyMember CM ON CJ.CompanyMemberId = CM.CompanyMemberId
INNER JOIN User P ON CM.UserId = P.UserId;

--

CREATE VIEW CompanyMemberView AS
SELECT 
  C.Name AS CompanyName, 
  P.Email AS MemberEmail
FROM CompanyMember CM
INNER JOIN Company C ON CM.CompanyId = C.CompanyId
INNER JOIN User P ON CM.UserId = P.UserId;

--

CREATE VIEW JobSeekerSavedJobsView AS
SELECT
  P.FirstName AS JobSeekerName,
  J.Title AS JobTitle,
  C.Name AS CompanyName
FROM User P
INNER JOIN JobSeekerSavedJob JSSJ ON P.UserId = JSSJ.JobSeekerId
INNER JOIN Job J ON J.JobId = JSSJ.JobId
INNER JOIN CompanyJob CJ ON J.JobId = CJ.JobId
INNER JOIN Company C ON CJ.CompanyId = C.CompanyId;

--

CREATE VIEW JobSeekerJobApplicationsView AS
SELECT
  P.FirstName AS JobSeekerName,
  J.Title AS JobTitle,
  C.Name AS CompanyName
FROM JobApplication JA
INNER JOIN User P ON JA.JobSeekerId = P.UserId
INNER JOIN Job J ON JA.JobId = J.JobId
INNER JOIN CompanyJob CJ ON J.JobId = CJ.JobId
INNER JOIN Company C ON CJ.CompanyId = C.CompanyId;

--

CREATE VIEW CompanyFollowersView AS
SELECT
  C.Name AS CompanyName,
  P.FirstName AS FollowerName
FROM CompanyFollower CF
INNER JOIN Company C ON CF.CompanyId = C.CompanyId
INNER JOIN User P ON CF.JobSeekerId = P.UserId
-- WHERE CF.UserId = 4;

--

CREATE VIEW CompanyJobApplicationsView AS
SELECT
  C.Name AS CompanyName,
  P.FirstName AS JobSeekerName,
  J.Title AS JobTitle
FROM JobApplication JA
INNER JOIN Job J ON JA.JobId = J.JobId
INNER JOIN User P ON JA.JobSeekerId = P.UserId
INNER JOIN CompanyJob CJ ON JA.JobId = CJ.JobId
INNER JOIN Company C ON CJ.CompanyId = C.CompanyId;

--
