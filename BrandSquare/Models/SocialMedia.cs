namespace BrandSquare.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("SocialMedia")]
    public partial class SocialMedia
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SocialMedia()
        {
            Brands = new HashSet<Brand>();
        }

        public int ID { get; set; }

        [StringLength(100)]
        public string FaceBookPage { get; set; }

        [StringLength(100)]
        public string TwitterHandle { get; set; }

        [StringLength(100)]
        public string InstagramLink { get; set; }

        [StringLength(100)]
        public string EmailAddress { get; set; }

        [StringLength(100)]
        public string Website { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Brand> Brands { get; set; }
    }
}
