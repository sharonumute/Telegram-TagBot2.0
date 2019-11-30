-- Drop table

-- DROP TABLE [telegram-botbase].dbo.Users GO

CREATE TABLE [telegram-botbase].dbo.Users
(
	UserID int NOT NULL,
	Name varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Username varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CreationTimestamp datetime NOT NULL,
	UpdateTimestamp datetime NOT NULL,
	CONSTRAINT Users_PK PRIMARY KEY (UserID),
	CONSTRAINT Users_Unique_Username UNIQUE (Username)
) GO
CREATE UNIQUE INDEX Users_Unique_Username ON [telegram-botbase].dbo.Users (Username) GO

-- Drop table

-- DROP TABLE [telegram-botbase].dbo.Groups GO

CREATE TABLE [telegram-botbase].dbo.Groups
(
	GroupID int NOT NULL,
	Name varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CreationTimestamp datetime NOT NULL,
	UpdateTimestamp datetime NOT NULL,
	CONSTRAINT Groups_PK PRIMARY KEY (GroupID)
) GO

-- Drop table

-- DROP TABLE [telegram-botbase].dbo.UserGroupMembership GO

CREATE TABLE [telegram-botbase].dbo.UserGroupMembership
(
	UserGroupMembershipID int IDENTITY(0,1) NOT NULL,
	CreationTimestamp datetime NOT NULL,
	UpdateTimestamp datetime NOT NULL,
	UserID int NOT NULL,
	GroupID int NOT NULL,
	CONSTRAINT UserGroupMembership_PK PRIMARY KEY (UserGroupMembershipID),
	CONSTRAINT UserGroupMembership_Unique_Membership UNIQUE (UserID,GroupID),
	CONSTRAINT UserGroupMembership_FK FOREIGN KEY (UserID) REFERENCES [telegram-botbase].dbo.Users(UserID) ON DELETE CASCADE,
	CONSTRAINT UserGroupMembership_FK_1 FOREIGN KEY (GroupID) REFERENCES [telegram-botbase].dbo.Groups(GroupID) ON DELETE CASCADE
) GO
CREATE UNIQUE INDEX UserGroupMembership_Unique_Membership ON [telegram-botbase].dbo.UserGroupMembership (UserID,GroupID) GO

-- Drop table

-- DROP TABLE [telegram-botbase].dbo.Tags GO

CREATE TABLE [telegram-botbase].dbo.Tags
(
	TagID int IDENTITY(0,1) NOT NULL,
	Name varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Description varchar(500) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CreationTimestamp datetime NOT NULL,
	UpdateTimestamp datetime NOT NULL,
	GroupID int NOT NULL,
	CreatorUserID int NOT NULL,
	CONSTRAINT Tags_PK PRIMARY KEY (TagID),
	CONSTRAINT Tags_UN UNIQUE (GroupID,Name),
	CONSTRAINT Tags_FK FOREIGN KEY (GroupID) REFERENCES [telegram-botbase].dbo.Groups(GroupID) ON DELETE CASCADE,
	CONSTRAINT Tags_FK_1 FOREIGN KEY (CreatorUserID) REFERENCES [telegram-botbase].dbo.Users(UserID)
) GO
CREATE UNIQUE INDEX Tags_UN ON [telegram-botbase].dbo.Tags (GroupID,Name) GO

-- Drop table

-- DROP TABLE [telegram-botbase].dbo.TagUserMembership GO

CREATE TABLE [telegram-botbase].dbo.TagUserMembership
(
	TagUserMembershipID int IDENTITY(0,1) NOT NULL,
	CreationTimestamp datetime NOT NULL,
	UpdateTimestamp datetime NOT NULL,
	UserID int NOT NULL,
	TagID int NOT NULL,
	CONSTRAINT TagUserMembership_PK PRIMARY KEY (TagUserMembershipID),
	CONSTRAINT TagUserMembership_Unique_Membership UNIQUE (UserID,TagID),
	CONSTRAINT TagUserMembership_FK FOREIGN KEY (UserID) REFERENCES [telegram-botbase].dbo.Users(UserID) ON DELETE CASCADE,
	CONSTRAINT TagUserMembership_FK_1 FOREIGN KEY (TagID) REFERENCES [telegram-botbase].dbo.Tags(TagID) ON DELETE CASCADE
) GO
CREATE UNIQUE INDEX TagUserMembership_Unique_Membership ON [telegram-botbase].dbo.TagUserMembership (UserID,TagID) GO;
