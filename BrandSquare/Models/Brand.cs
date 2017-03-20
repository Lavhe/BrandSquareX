namespace BrandSquare.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Brand")]
    public partial class Brand
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Brand()
        {
            Events = new HashSet<Event>();
            Sales = new HashSet<Sale>();
        }

        public int BrandID { get; set; }

        [Required]
        [StringLength(100)]
        public string BrandName { get; set; }

        [Column(TypeName = "text")]
        public string BrandLogo { get; set; }

        [Column(TypeName = "text")]
        public string BrandHomeAddress { get; set; }

        public int BrandSocialMediaID { get; set; }

        public int BrandCategoryID { get; set; }

        [Column(TypeName = "text")]
        public string BrandPassword { get; set; }

        [Column(TypeName = "text")]
        public string BrandBio { get; set; }

        public virtual Category Category { get; set; }

        public virtual SocialMedia SocialMedia { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Event> Events { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sale> Sales { get; set; }
    }
}
