namespace BrandSquare.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Location")]
    public partial class Location
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Location()
        {
            Events = new HashSet<Event>();
        }

        public int ID { get; set; }

        [StringLength(100)]
        public string LocationLat { get; set; }

        [StringLength(100)]
        public string LocationLon { get; set; }

        [StringLength(100)]
        public string LocationProvince { get; set; }

        [StringLength(100)]
        public string LocationCountry { get; set; }

        [StringLength(100)]
        public string LocationTownCity { get; set; }

        [StringLength(100)]
        public string LocationLocalName { get; set; }

        [StringLength(100)]
        public string LocationStreetName { get; set; }

        [StringLength(100)]
        public string LocationHouseShopNumber { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Event> Events { get; set; }
    }
}
