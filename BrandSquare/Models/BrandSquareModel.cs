namespace BrandSquare.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class BrandSquareModel : DbContext
    {
        public BrandSquareModel()
            : base("name=BrandSquareModel")
        {
        }

        public virtual DbSet<Brand> Brands { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Event> Events { get; set; }
        public virtual DbSet<Location> Locations { get; set; }
        public virtual DbSet<Sale> Sales { get; set; }
        public virtual DbSet<SocialMedia> SocialMedias { get; set; }
        public virtual DbSet<Status> Status { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Brand>()
                .Property(e => e.BrandName)
                .IsUnicode(false);

            modelBuilder.Entity<Brand>()
                .Property(e => e.BrandLogo)
                .IsUnicode(false);

            modelBuilder.Entity<Brand>()
                .Property(e => e.BrandHomeAddress)
                .IsUnicode(false);

            modelBuilder.Entity<Brand>()
                .Property(e => e.BrandPassword)
                .IsUnicode(false);

            modelBuilder.Entity<Brand>()
                .Property(e => e.BrandBio)
                .IsUnicode(false);

            modelBuilder.Entity<Brand>()
                .HasMany(e => e.Events)
                .WithRequired(e => e.Brand)
                .HasForeignKey(e => e.EventHostID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Brand>()
                .HasMany(e => e.Sales)
                .WithRequired(e => e.Brand)
                .HasForeignKey(e => e.SellerID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Brand>()
                .HasMany(e => e.Status)
                .WithRequired(e => e.Brand)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Category>()
                .Property(e => e.CategoryName)
                .IsUnicode(false);

            modelBuilder.Entity<Category>()
                .HasMany(e => e.Brands)
                .WithRequired(e => e.Category)
                .HasForeignKey(e => e.BrandCategoryID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Category>()
                .HasMany(e => e.Events)
                .WithRequired(e => e.Category)
                .HasForeignKey(e => e.EventCategoryID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Category>()
                .HasMany(e => e.Sales)
                .WithRequired(e => e.Category)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Event>()
                .Property(e => e.EventName)
                .IsUnicode(false);

            modelBuilder.Entity<Event>()
                .Property(e => e.EventPlace)
                .IsUnicode(false);

            modelBuilder.Entity<Event>()
                .Property(e => e.EventDate)
                .IsUnicode(false);

            modelBuilder.Entity<Event>()
                .Property(e => e.EventLineUp)
                .IsUnicode(false);

            modelBuilder.Entity<Location>()
                .Property(e => e.LocationLat)
                .IsUnicode(false);

            modelBuilder.Entity<Location>()
                .Property(e => e.LocationLon)
                .IsUnicode(false);

            modelBuilder.Entity<Location>()
                .Property(e => e.LocationProvince)
                .IsUnicode(false);

            modelBuilder.Entity<Location>()
                .Property(e => e.LocationCountry)
                .IsUnicode(false);

            modelBuilder.Entity<Location>()
                .Property(e => e.LocationTownCity)
                .IsUnicode(false);

            modelBuilder.Entity<Location>()
                .Property(e => e.LocationLocalName)
                .IsUnicode(false);

            modelBuilder.Entity<Location>()
                .Property(e => e.LocationStreetName)
                .IsUnicode(false);

            modelBuilder.Entity<Location>()
                .Property(e => e.LocationHouseShopNumber)
                .IsUnicode(false);

            modelBuilder.Entity<Location>()
                .HasMany(e => e.Events)
                .WithOptional(e => e.Location)
                .HasForeignKey(e => e.EventLocationID);

            modelBuilder.Entity<Sale>()
                .Property(e => e.Image)
                .IsUnicode(false);

            modelBuilder.Entity<Sale>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<SocialMedia>()
                .Property(e => e.FaceBookPage)
                .IsUnicode(false);

            modelBuilder.Entity<SocialMedia>()
                .Property(e => e.TwitterHandle)
                .IsUnicode(false);

            modelBuilder.Entity<SocialMedia>()
                .Property(e => e.InstagramLink)
                .IsUnicode(false);

            modelBuilder.Entity<SocialMedia>()
                .Property(e => e.EmailAddress)
                .IsUnicode(false);

            modelBuilder.Entity<SocialMedia>()
                .Property(e => e.Website)
                .IsUnicode(false);

            modelBuilder.Entity<SocialMedia>()
                .HasMany(e => e.Brands)
                .WithRequired(e => e.SocialMedia)
                .HasForeignKey(e => e.BrandSocialMediaID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Status>()
                .Property(e => e.Status1)
                .IsUnicode(false);

            modelBuilder.Entity<Status>()
                .Property(e => e.DateTimePosted)
                .IsUnicode(false);
        }
    }
}
