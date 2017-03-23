namespace BrandSquare.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Status
    {
        public int ID { get; set; }

        [Column("Status")]
        [Required]
        [StringLength(200)]
        public string Status1 { get; set; }

        [Required]
        [StringLength(200)]
        public string DateTimePosted { get; set; }

        public int BrandID { get; set; }

        public virtual Brand Brand { get; set; }
    }
}
