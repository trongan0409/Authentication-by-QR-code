USE [master]
GO
/****** Object:  Database [doan_an]    Script Date: 9/11/2023 9:34:46 PM ******/
CREATE DATABASE [doan_an]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'doan_an', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.HAONT_2509\MSSQL\DATA\doan_an.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'doan_an_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.HAONT_2509\MSSQL\DATA\doan_an_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [doan_an] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [doan_an].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [doan_an] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [doan_an] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [doan_an] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [doan_an] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [doan_an] SET ARITHABORT OFF 
GO
ALTER DATABASE [doan_an] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [doan_an] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [doan_an] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [doan_an] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [doan_an] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [doan_an] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [doan_an] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [doan_an] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [doan_an] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [doan_an] SET  DISABLE_BROKER 
GO
ALTER DATABASE [doan_an] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [doan_an] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [doan_an] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [doan_an] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [doan_an] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [doan_an] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [doan_an] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [doan_an] SET RECOVERY FULL 
GO
ALTER DATABASE [doan_an] SET  MULTI_USER 
GO
ALTER DATABASE [doan_an] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [doan_an] SET DB_CHAINING OFF 
GO
ALTER DATABASE [doan_an] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [doan_an] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [doan_an] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [doan_an] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'doan_an', N'ON'
GO
ALTER DATABASE [doan_an] SET QUERY_STORE = ON
GO
ALTER DATABASE [doan_an] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [doan_an]
GO
/****** Object:  User [doann_trong_an]    Script Date: 9/11/2023 9:34:48 PM ******/
CREATE USER [doann_trong_an] FOR LOGIN [doann_trong_an] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [doann_trong_an]
GO
ALTER ROLE [db_accessadmin] ADD MEMBER [doann_trong_an]
GO
ALTER ROLE [db_ddladmin] ADD MEMBER [doann_trong_an]
GO
/****** Object:  Table [dbo].[account]    Script Date: 9/11/2023 9:34:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[account](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[idUser] [int] NULL,
	[username] [nvarchar](255) NOT NULL,
	[password] [nvarchar](max) NOT NULL,
	[role] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[chi_tiet_LHP]    Script Date: 9/11/2023 9:34:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[chi_tiet_LHP](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[idStudent] [int] NULL,
	[diem_cc] [nvarchar](50) NULL,
	[diem_bt] [nvarchar](50) NULL,
	[giua_ky] [nvarchar](50) NULL,
	[cuoi_ky] [nvarchar](50) NULL,
	[diem_t4] [nvarchar](50) NULL,
	[diem_t10] [nvarchar](50) NULL,
	[diem_tong] [nvarchar](50) NULL,
	[diem_chu] [nvarchar](50) NULL,
	[diem_xac_nhan] [nvarchar](50) NULL,
	[idLHP] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[class]    Script Date: 9/11/2023 9:34:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[class](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[idUser] [int] NULL,
	[nameClass] [nvarchar](max) NOT NULL,
	[list_student] [nvarchar](max) NULL,
	[active] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[informationUser]    Script Date: 9/11/2023 9:34:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[informationUser](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[idClass] [int] NULL,
	[fullName] [nvarchar](max) NULL,
	[email] [nvarchar](255) NULL,
	[avatar] [nvarchar](max) NULL,
	[address] [nvarchar](max) NULL,
	[sex] [nvarchar](10) NULL,
	[phone] [nvarchar](10) NULL,
	[cccd] [nvarchar](50) NULL,
	[birthDay] [nvarchar](50) NULL,
	[active] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[lop_hoc_phan]    Script Date: 9/11/2023 9:34:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[lop_hoc_phan](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_giaovien] [int] NULL,
	[TC] [int] NULL,
	[tiet] [nvarchar](max) NULL,
	[tuan] [nvarchar](max) NULL,
	[nhom] [nvarchar](50) NULL,
	[idClass] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[account]  WITH CHECK ADD  CONSTRAINT [FK_account_informationUser] FOREIGN KEY([idUser])
REFERENCES [dbo].[informationUser] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[account] CHECK CONSTRAINT [FK_account_informationUser]
GO
ALTER TABLE [dbo].[chi_tiet_LHP]  WITH CHECK ADD  CONSTRAINT [FK_chi_tiet_LHP_informationUser] FOREIGN KEY([idStudent])
REFERENCES [dbo].[informationUser] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[chi_tiet_LHP] CHECK CONSTRAINT [FK_chi_tiet_LHP_informationUser]
GO
ALTER TABLE [dbo].[class]  WITH CHECK ADD  CONSTRAINT [FK_class_informationUser] FOREIGN KEY([idUser])
REFERENCES [dbo].[informationUser] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[class] CHECK CONSTRAINT [FK_class_informationUser]
GO
ALTER TABLE [dbo].[lop_hoc_phan]  WITH CHECK ADD  CONSTRAINT [FK_lop_hoc_phan_informationUser] FOREIGN KEY([id_giaovien])
REFERENCES [dbo].[informationUser] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[lop_hoc_phan] CHECK CONSTRAINT [FK_lop_hoc_phan_informationUser]
GO
USE [master]
GO
ALTER DATABASE [doan_an] SET  READ_WRITE 
GO
